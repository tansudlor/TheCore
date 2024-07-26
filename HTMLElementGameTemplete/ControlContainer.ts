import { GameElement } from "./GameElement";

export class ControlContainer extends GameElement {
  protected parent: GameElement;
  private con: HTMLElement;
  public RefWidth: number;
  public RefHeight: number;
  public Width: number;
  public Height: number;
  public ScaleFactor: number;
  constructor(id: string, src: string, parent: GameElement) {
    super(id, src, parent);
    this.resource = this.CreateContainer();
    this.update(this);
  }

  update(self: GameElement): void {
    this.ScaleFactor = window.innerHeight / this.RefHeight;
    this.con.style.width = this.RefWidth * this.ScaleFactor + "px";
    this.con.style.height = window.innerHeight + "px";
    this.Width = this.RefWidth * this.ScaleFactor;
    this.Height = window.innerHeight;
  }

  CreateContainer() {
    this.con = document.createElement("div");
    this.con.id = this.id;
    this.con.style.position = "fixed";
    this.con.style.top = "50%";
    this.con.style.left = "50%";
    this.con.style.width = "1920px";
    this.con.style.height = "1080px";
    //this.con.style.backgroundColor = "#FFFFFF";
    this.con.style.transform = "translate(-50%,-50%)";
    this.RefWidth = 3840;
    this.RefHeight = 1080;

    if (this.parent == null) {
      document.body.appendChild(this.con);
    } else {
      this.parent.resource.appendChild(this.con);
    }

    return this.con;
  }
}
