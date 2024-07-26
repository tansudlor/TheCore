import { GameElement } from "./GameElement";
import { Image } from "./Image";
import { Player } from "./Player";

export class Hole extends Image {
  private count: number = 0;
  public Player: Player;
  start(): void {
    GameElement.SetPostion(this.resource, this.X, this.Y);
  }

  update(): void {
    GameElement.SetPostion(this.resource, this.X, this.Y);
    GameElement.ClearTransform(this.resource);
    GameElement.TransformPivot(this.resource, -50, -50);
    GameElement.TransformAngle(this.resource, this.Angle);
    if (
      Math.abs(this.Y - this.Player.Y) >
      GameElement.GameElementColletion["controlArea"].Height
    ) {
      console.log("removehole");
      this.resource.remove();
      this.destroy();
    }
  }
}
