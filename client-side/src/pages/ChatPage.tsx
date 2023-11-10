import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { GlobalStyle } from '../GlobalStyle';
import { Window } from '../layouts/Window';
import { CommentsDate } from '../layouts/CommentsDate';
import Bubble from '../components/Bubble';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { Comment, Response } from '../Types';
import { addComment, getAllComments } from '../api/commentsApi';
import { errorMessage } from '../lib/errorMessage';
import { InputWithButtonWrapper } from '../layouts/InputWithButtonWrapper';

const ChatPage = (): JSX.Element => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [textToSend, setTextToSend] = useState<string>('');
  const [isSentNewComment, setIsSentNewComment] = useState<boolean>(false);
  const [idOfSelectedComment, setIdOfSelectedComment] = useState<string>('');

  const ref = useRef<HTMLTextAreaElement>(null);
  const stickyInputRef = useRef<HTMLInputElement>(null);
  const windowContainerRef = useRef<HTMLInputElement>(null);

  // fetching all comments
  useEffect(() => {
    getAllComments()
      .then((response) => setComments(response.data.comments))
      .catch((error) => {
        Swal.fire({
          title: 'Server is not working...',
          text: 'Please go to server-side folder and start the server with command: json-server --watch db.json --port 8000',
          icon: 'error'
        });
      });
  }, []);

  // scroll to the bottom if the new comment (not reply) sent
  useEffect(() => {
    if (windowContainerRef.current && isSentNewComment) {
      const element = windowContainerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [windowContainerRef, isSentNewComment]);

  // hide input if sroll is active
  useEffect(() => {
    if (windowContainerRef.current && stickyInputRef.current) {
      const container = windowContainerRef.current;
      const inputWrapper = stickyInputRef.current;

      let timeout: ReturnType<typeof setTimeout>;

      const handleScroll = () => {
        console.log('USAO');
        inputWrapper.style.display = 'none';

        // Clear the previous timeout
        clearTimeout(timeout);

        // Set a new timeout to show the inputWrapper after a delay (e.g., 200 milliseconds)
        timeout = setTimeout(() => {
          inputWrapper.style.display = 'flex';
        }, 200);
      };

      // Attach the scroll event listener when the component mounts
      container.addEventListener('scroll', handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        container.removeEventListener('scroll', handleScroll);

        // Clear the timeout to avoid any delayed showing of the inputWrapper on unmount
        clearTimeout(timeout);
      };
    }
  }, []);

  // focus on input when reply is clicked
  const replyClick = (id: string) => {
    setIdOfSelectedComment(id);

    ref.current?.focus();
  };

  // grouping root comments by the same date
  const groupedComments = comments.reduce(
    (acc: { [key: string]: Comment[] }, comment: Comment) => {
      const date = new Date(comment.timestamp);
      const dateString = date.toLocaleDateString();

      if (!acc[dateString]) {
        acc[dateString] = [];
      }

      acc[dateString].push(comment);

      return acc;
    },
    {}
  );

  // new comment send
  const sendComment = (text: string) => {
    const allIds = comments.map((comment: Comment) => comment.id).map(Number);
    const lastId = allIds.reduce((acc, currentNumber) => {
      return currentNumber > acc ? currentNumber : acc;
    }, allIds[0]);

    const data = [
      ...comments,
      {
        id: String(lastId + 1),
        parent_id: idOfSelectedComment ? idOfSelectedComment : undefined,
        author: {
          name: 'Anonymous',
          picture: 'img/anonymous.jpg'
        },
        text: text,
        timestamp: Date.now()
      }
    ];

    addComment({ comments: data })
      .then((response: Response) => {
        setIdOfSelectedComment('');
        setTextToSend('');

        if (!idOfSelectedComment) setIsSentNewComment(true);

        getAllComments()
          .then((response: Response) => {
            setIsSentNewComment(false);
            setComments(response.data.comments);
          })
          .catch((error: Error) => errorMessage(error));
      })
      .catch((error: Error) => errorMessage(error));
  };

  return (
    <>
      <GlobalStyle />

      <Window ref={windowContainerRef}>
        {Object.keys(groupedComments).map(
          (dateString: string, index: number) => {
            const commentsByDate = groupedComments[dateString];
            const rootComments = commentsByDate.filter(
              (comment: Comment) => !comment.hasOwnProperty('parent_id')
            );

            return (
              <div key={index}>
                <CommentsDate>{dateString}</CommentsDate>

                {rootComments.map((comment: Comment) => {
                  const {
                    id,
                    parent_id,
                    author: { name, picture },
                    text,
                    timestamp
                  } = comment;

                  return (
                    <Bubble
                      key={id}
                      id={id}
                      hasParrent={parent_id}
                      authorName={name}
                      authorPicture={picture}
                      text={text}
                      timestamp={timestamp}
                      replyClick={replyClick}
                      allComments={comments}
                    />
                  );
                })}
              </div>
            );
          }
        )}

        <InputWithButtonWrapper ref={stickyInputRef}>
          <Input
            placeholder={idOfSelectedComment ? 'Add Reply' : 'Add Comment'}
            value={textToSend}
            onChange={(e) => setTextToSend(e.target.value)}
            onKeyDown={(e) => e.code === 'Enter' && sendComment(textToSend)}
            ref={ref}
          />
          <Button
            disabled={!textToSend}
            onClick={() => sendComment(textToSend)}
          >
            Send
          </Button>
        </InputWithButtonWrapper>
      </Window>
    </>
  );
};

export default ChatPage;
