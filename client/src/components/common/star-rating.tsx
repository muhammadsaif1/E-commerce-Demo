import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

interface RatingProps {
  rating: number;
  handleRatingChange?: (star: number) => void;
}

function StarRating({ rating, handleRatingChange }: RatingProps) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
      className={`p-2 roundede-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant={"outline"}
      size={"icon"}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StarRating;