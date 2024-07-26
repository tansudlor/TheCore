import { Image } from "./Image";
import { GameElement } from "./GameElement";
export class Player extends Image {
  public Speed: number = 0;

  start(): void {
    //GameElement.SetStyle(this.resource, this.X, this.Y, 100, 0);
    GameElement.SetPostion(this.resource, this.X, this.Y);
    console.log(
      "GameElement.GameElementColletion[controlAre].Width" +
        GameElement.GameElementColletion["controlArea"].Width / 2
    );
    this.X = 0;
    this.Y = GameElement.GameElementColletion["controlArea"].Height / 2;
    GameElement.TransformPivot(this.resource, -50, -50);
    //this.resource.style.zIndex = "9";
  }

  update(): void {
    GameElement.ClearTransform(this.resource);
    GameElement.TransformPivot(this.resource, -50, -50);
    GameElement.TransformAngle(this.resource, this.Angle);
    //console.log(this.X, this.Y);
    GameElement.SetPostion(this.resource, this.X, this.Y);
  }
}
