import { GameElement } from "./GameElement";
import { Player } from "./Player";
import { Image } from "./Image";
import { Background } from "./Background";
import { Container } from "./Container";
import { Hole } from "./Hole";
import { Item } from "./Item";
import { UI } from "./UI";
import { ControlContainer } from "./ControlContainer";
export class GameController extends GameElement {
  public Camera: GameElement;
  public UIArea: GameElement;
  public bg: Background;
  public player: Player;
  public follow = { X: 0, Y: 0 };
  public hole: Hole;
  public controlArea: ControlContainer;
  public gameName: UI;
  public Key: object = {};
  public ScoreText;
  public Title: Image;
  private controlSpeed = 10;
  public CurrentSpeed = 30;
  private fullSpeed = 50;
  private fuel = 500;
  private item = ["/Group-2.svg", "/Group-3.svg", "/Group-4.svg"];
  public itemList: object = {};
  private angleLimit = 50;
  private frameCount = 0;
  constructor(id: string, src: string, parent: GameElement) {
    super(id, src, parent);
    this.start();
  }

  start(): void {
    this.controlArea = new ControlContainer("controlArea", null, null);
    //UIArea
    this.UIArea = new ControlContainer("UIArea", null, null);

    /*let titleBg = Background.LoadTileImage(null, this.UIArea.resource);
    titleBg.style.backgroundColor = "#039EF2";

    this.Title = new Image("Title", "/THECORE.svg", this.UIArea);
    GameElement.TransformPivot(this.Title.resource, -50, -50);
    GameElement.SetPostion(this.Title.resource, 50, 50, "%");
    this.Title.resource.style.width = "100%";
    this.Title.resource.style.height = "100%";
    this.Title.resource.style.position = "absolute";

    /*this.UIArea.resource.style.backgroundColor = "gray";
    this.gameName = new UI("theCore", "The Core", this.UIArea);
    this.gameName.FontSize = "100px";
    this.gameName.X = GameElement.GameElementColletion["controlArea"].Width / 2;
    this.gameName.Y =
      GameElement.GameElementColletion["controlArea"].Height / 2 - 75;
    this.gameName.start();

    let clickToContinue = document.createElement*/

    this.Camera = new Container("Camera", null, this.controlArea);
    this.bg = new Background("bg", "/123456.png", this.Camera);

    this.player = new Player("player", "/Group.svg", this.Camera);
    this.player.start();
    this.player.resource.style.zIndex = "999";
    this.follow = this.player;

    /*
    this.ScoreText = new UI("score", "Score", this.uiArea);

    let leftButton = document.createElement("button");
    leftButton.style.left = "10%";
    leftButton.style.top = "85%";
    leftButton.style.width = "100px";
    leftButton.style.height = "100px";
    leftButton.style.position = "absolute";
    leftButton.style.backgroundColor = "transparent";
    leftButton.style.border = "none";
    let leftImage = document.createElement("img");
    leftImage.src = "/bt_arrow_left.svg";
    leftButton.appendChild(leftImage);
    leftButton.addEventListener("touchstart", (event) => {
      event.preventDefault();
      leftImage.style.backgroundColor = "#FF0000";
      setTimeout(() => {
        leftImage.style.backgroundColor = "transparent";
      }, 1000);
      this.Key["left"] = true;
    });
    leftButton.addEventListener("touchend", (event) => {
      event.preventDefault();
      delete this.Key["left"];
    });

    this.uiArea.resource.appendChild(leftButton);

    let rightButton = document.createElement("button");
    rightButton.style.right = "10%";
    rightButton.style.top = "85%";
    rightButton.style.width = "100px";
    rightButton.style.height = "100px";
    rightButton.style.position = "absolute";
    rightButton.style.backgroundColor = "transparent";
    rightButton.style.border = "none";
    let rightImage = document.createElement("img");
    rightImage.src = "/bt_arrow_right.svg";
    rightButton.appendChild(rightImage);
    rightButton.addEventListener("touchstart", (event) => {
      event.preventDefault();
      rightImage.style.backgroundColor = "#FF0000";
      setTimeout(() => {
        rightImage.style.backgroundColor = "transparent";
      }, 1000);
      this.Key["right"] = true;
    });
    rightButton.addEventListener("touchend", (event) => {
      event.preventDefault();
      delete this.Key["right"];
    });
    this.uiArea.resource.appendChild(rightButton);*/

    window.addEventListener("resize", (event) => {
      console.log("resize");
      this.Title.resource.style.height = "100%";
      if (window.innerWidth > window.innerHeight) {
        console.log("window.innerWidth > window.innerHeight");

        this.Title.resource.style.width = "auto";
      } else {
        console.log("window.innerHeight > window.innerWidth");

        this.Title.resource.style.width = "auto";
      }
    });

    document.addEventListener("keydown", (event) => {
      this.Key[event.key] = true;
      console.log(event.key);
    });
    document.addEventListener("keyup", (event) => {
      delete this.Key[event.key];
    });
  }

  update(): void {
    //console.log(this.controlArea.resource.style.width);

    let scaleFactor =
      GameElement.GameElementColletion["controlArea"].ScaleFactor;
    if (this.Key["ArrowLeft"] != null) {
      this.player.Angle += this.controlSpeed;
    }
    if (this.Key["ArrowRight"] != null) {
      this.player.Angle -= this.controlSpeed;
    }

    if (this.Key["left"] != null) {
      this.player.Angle += this.controlSpeed;
    }
    if (this.Key["right"] != null) {
      this.player.Angle -= this.controlSpeed;
    }

    if (this.player.Angle > this.angleLimit) {
      this.player.Angle = this.angleLimit;
    }
    if (this.player.Angle < -this.angleLimit) {
      this.player.Angle = -this.angleLimit;
    }
    //console.log(GameElement.GameElementColletion["controlArea"].Height);
    this.CurrentSpeed -= this.fullSpeed / this.fuel;
    if (this.CurrentSpeed < 0) {
      this.CurrentSpeed = 0;
    }

    if (this.CurrentSpeed > 100) {
      this.CurrentSpeed = 100;
    }

    this.player.X -=
      Math.cos(((this.player.Angle - 90) * Math.PI) / 180) *
      this.CurrentSpeed *
      scaleFactor;
    this.player.Y -=
      Math.sin(((this.player.Angle - 90) * Math.PI) / 180) *
      this.CurrentSpeed *
      scaleFactor;

    this.bg.X = this.player.X;
    this.bg.Y = this.player.Y;

    this.frameCount++;
    let delay = Math.round(50 / this.CurrentSpeed);
    console.log(delay + " : " + this.CurrentSpeed);
    if (delay < 1) delay = 1;

    if (this.frameCount % delay == 0) {
      let hole = new Hole(
        "hole" + this.frameCount,
        "/GroundTitle.svg",
        this.Camera
      );
      hole.resource.style.zIndex = "1";
      hole.X = this.player.X;
      hole.Y = this.player.Y;
      hole.Player = this.player;
      hole.Angle = this.player.Angle;
    }

    if (this.frameCount % delay == 0) {
      let itemPath = this.RandomImage();
      let itemIndex = "item" + this.frameCount;
      let itemCreate = new Item(itemIndex, itemPath, this.Camera);
      itemCreate.X = this.getRandomXNumber();
      itemCreate.Y = this.player.Y + 1000;
      itemCreate.Player = this.player;
      itemCreate.GameController = this;
      itemCreate.ItemType = itemPath;
      itemCreate.start();
    }

    ///camera follow player
    this.Camera.X =
      GameElement.GameElementColletion["controlArea"].Width - this.follow.X;
    this.Camera.Y =
      GameElement.GameElementColletion["controlArea"].Height - this.follow.Y;
  }

  private scoreCount = 0;
  ScoreUpdate(Score: number) {
    //console.log(Score);
    this.scoreCount += Score;
    this.ScoreText.resource.textContent = "Score : " + this.scoreCount;
    //console.log(this.scoreCount);
  }

  RandomImage(): string {
    let randomIndex = Math.floor(Math.random() * this.item.length);
    return this.item[randomIndex];
  }

  getRandomXNumber(): number {
    const number = this.player.X + Math.random() * 15000 - 7500;

    return number;
  }
  /* getRandomYNumber(): number {
    const number = Math.floor(Math.random() * 9901) + 100; // สุ่มตัวเลขระหว่าง 100 ถึง 10000
    return number;
  }*/

  checkAndRemoveOffScreenElements(): void {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  }

  stopFunction = () => {
    //clearInterval(intervalId);
  };
}
