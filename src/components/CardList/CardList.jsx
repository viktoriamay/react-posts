import { Card } from "../Card/Card"

export const CardList = ({posts}) => {
  return (
    <>
    {posts.map((post) => (
        <Card key={post._id} {...post} />
      ))}
    </>
  )
}