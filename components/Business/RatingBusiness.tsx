interface RatingBusinessProps {
  rating: number
}

export default function RatingBusiness({ rating }: RatingBusinessProps) {
  return (
    <div className="rating rating-lg mt-5">
      <input
        type="radio"
        name="rating-10"
        className="rating-hidden"
        aria-label="clear"
        checked={rating === 0}
        readOnly
      />
      {[1, 2, 3, 4, 5].map((value) => (
        <input
          key={value}
          type="radio"
          name="rating-10"
          className="mask mask-star-2"
          aria-label={`${value} star`}
          checked={rating === value}
          readOnly
        />
      ))}
    </div>
  )
}