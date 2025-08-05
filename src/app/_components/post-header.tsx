import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  category: string;
};

export function PostHeader({ title, coverImage, date, author, category }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="flex items-center justify-center mb-6">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {category && (
            <div>
              <span className="inline-block text-md">
                {category}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center text-md gap-1">
          <svg width={18} height={18} stroke="currentColor" className="opacity-80">
            <use href="/icons.svg#clock" />
          </svg>
          <DateFormatter dateString={date} />
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  );
}
