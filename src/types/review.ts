export default interface IReview {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
}
