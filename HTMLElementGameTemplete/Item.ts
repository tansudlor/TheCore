import { Player } from "./Player";
import { GameController } from "./GameController";
import { GameElement } from "./GameElement";
import { Image } from "./Image";

export class Item extends Image {
  public Player: Player;
  public Score;
  public GameController: GameController;
  public ItemType;
  start(): void {
    //GameElement.SetStyle(this.resource, this.X + 50, this.Y, 150, 0);

    GameElement.TransformPivot(this.resource, -50, -50);
    GameElement.SetPostion(this.resource, this.X, this.Y);
  }

  update(): void {
    if (
      this.areCirclesColliding(
        this.Player.X,
        this.Player.Y,
        60,
        this.X,
        this.Y,
        60
      )
    ) {
      this.resource.remove();
      this.GameController.CurrentSpeed += 10;
      this.destroy();
    }

    if (
      this.Y - this.Player.Y <
      -GameElement.GameElementColletion["controlArea"].Height
    ) {
      console.log("removeitem");
      this.resource.remove();
      this.destroy();
    }
  }

  areCirclesColliding(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ): boolean {
    const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return distance < r1 + r2;
  }
}
