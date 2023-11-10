import moment from 'moment';
import { Flex, Text } from '../GlobalStyle';
import { Bubble as BubbleUi } from '../layouts/Bubble';
import { UserImage } from '../layouts/UserImage';
import { Comment } from '../Types';
import { textWithLinks } from '../lib/textWithLinks';

interface Props {
  id: string;
  authorName: string;
  authorPicture: string;
  text: string;
  timestamp: number;
  replyClick: (parentId: string) => void;
  hasParrent?: string;
  allComments: Comment[];
}

const Bubble = ({
  id,
  authorName,
  authorPicture,
  text,
  timestamp,
  replyClick,
  allComments
}: Props) => {
  const replies = allComments.filter((x) => x.parent_id === id);

  return (
    <>
      <Flex margin="0 0 30px 0">
        <UserImage src={`/${authorPicture}`} />

        <Flex flexdirection="column" margin="0 0 0 19px">
          <BubbleUi>
            <Text
              fontWeight="600"
              fontSize="12px"
              lineheight="14.52px"
              color="#1E1E1E"
              margin="0 0 9px 0"
            >
              {authorName}
            </Text>
            <Text
              fontWeight="400"
              fontSize="12px"
              lineheight="14.52px"
              color="#82878D"
            >
              {textWithLinks(text)}
            </Text>
          </BubbleUi>
          <Flex gap="14px">
            <Text fontSize="10px" lineheight="12.1px">
              {moment(timestamp).format('h:mm')}
            </Text>
            <Text
              color="#1E1E1E"
              fontSize="10px"
              lineheight="12.1px"
              fontWeight="600"
              onhover="grey"
              cursor="pointer"
              onClick={() => replyClick(id)}
            >
              {replies.length > 1 ? 'Replies' : 'Reply'}{' '}
              {!!replies.length && `(${replies.length})`}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!!replies.length && (
        <div style={{ marginLeft: '40px' }}>
          {replies.map((reply: Comment) => {
            return (
              <Bubble
                id={reply.id}
                key={reply.id}
                authorName={reply.author.name}
                authorPicture={reply.author.picture}
                text={reply.text}
                timestamp={reply.timestamp}
                replyClick={replyClick}
                hasParrent={reply.parent_id}
                allComments={allComments}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Bubble;
