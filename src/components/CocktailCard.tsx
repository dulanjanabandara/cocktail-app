import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cocktail } from "@/types/cocktail";

interface CocktailCardProps {
  cocktail: Cocktail;
  onAction: () => void;
  actionLabel: string;
}

export function CocktailCard({
  cocktail,
  onAction,
  actionLabel,
}: CocktailCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg truncate">{cocktail.strDrink}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square">
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {cocktail.strCategory}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onAction} className="w-full">
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
