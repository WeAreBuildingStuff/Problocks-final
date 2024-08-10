import p5 from "p5";
import linePass from "./linesPass";

const distanceModifier = 50;
const commandDelay = 200;

export class CarAnimation {
  private p: p5;
  private commands: CarCommands[];
  private ghostCommands: CarCommands[];
  private x: number;
  private y: number;
  private angle: number;
  private currentCommandIndex: number;
  private distanceMoved: number;
  private angleTurned: number;
  private path: { x1: number; y1: number; x2: number; y2: number }[] = [];
  private ghostPath: { x1: number; y1: number; x2: number; y2: number }[] = [];
  private isAnimating: boolean;
  private isComplete: boolean;
  private checkedLines: boolean[] = [];
  private startX: number;
  private startY: number;

  constructor(
    p: p5,
    commands: CarCommands[],
    ghostCommands: CarCommands[] = []
  ) {
    this.p = p;
    this.commands = commands;
    this.ghostCommands = ghostCommands;
    this.x = 200;
    this.y = 300;
    this.startX = 200;
    this.startY = 300;
    this.angle = 0;
    this.currentCommandIndex = 0;
    this.distanceMoved = 0;
    this.angleTurned = 0;
    this.isAnimating = false;
    this.isComplete = false;
    this.calculateGhostPath();
    this.checkedLines = new Array(this.ghostPath.length).fill(false);
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async processCommand() {
    if (this.currentCommandIndex < this.commands.length) {
      const currentCommand = this.commands[this.currentCommandIndex];

      switch (currentCommand.type) {
        case "forward":
          if (this.distanceMoved < currentCommand.distance * distanceModifier) {
            this.distanceMoved++;
            const nextX = this.x + this.p.cos(this.p.radians(this.angle));
            const nextY = this.y + this.p.sin(this.p.radians(this.angle));
            if (
              this.distanceMoved ===
              currentCommand.distance * distanceModifier
            ) {
              this.path.push({
                x1: this.startX,
                y1: this.startY,
                x2: nextX,
                y2: nextY,
              });
              this.startX = nextX;
              this.startY = nextY;
            }
            this.x = nextX;
            this.y = nextY;
          } else {
            this.distanceMoved = 0;
            this.currentCommandIndex++;
            await this.delay(commandDelay);
          }
          break;

        case "backward":
          if (this.distanceMoved < currentCommand.distance * distanceModifier) {
            this.distanceMoved++;
            const nextX = this.x - this.p.cos(this.p.radians(this.angle));
            const nextY = this.y - this.p.sin(this.p.radians(this.angle));
            if (
              this.distanceMoved ===
              currentCommand.distance * distanceModifier
            ) {
              this.path.push({
                x1: this.startX,
                y1: this.startY,
                x2: nextX,
                y2: nextY,
              });
              this.startX = nextX;
              this.startY = nextY;
            }
            this.x = nextX;
            this.y = nextY;
          } else {
            this.distanceMoved = 0;
            this.currentCommandIndex++;
            await this.delay(commandDelay);
          }
          break;

        case "turnCounterClockwise":
          if (this.angleTurned < currentCommand.degrees) {
            this.angle -= 1;
            this.angleTurned++;
          } else {
            this.angleTurned = 0;
            this.currentCommandIndex++;
            await this.delay(commandDelay);
          }
          break;

        case "turnClockwise":
          if (this.angleTurned < currentCommand.degrees) {
            this.angle += 1;
            this.angleTurned++;
          } else {
            this.angleTurned = 0;
            this.currentCommandIndex++;
            await this.delay(commandDelay);
          }
          break;
      }
    } else {
      this.isAnimating = false;
      this.isComplete = true;
      console.log(this.check());
    }
  }

  async update() {
    if (!this.isComplete) {
      if (!this.isAnimating) {
        this.isAnimating = true;
        await this.processCommand();
        this.isAnimating = false;
      }
    }
  }

  display() {
    this.p.clear();
    this.p.background(255);

    this.p.strokeWeight(3);
    this.p.stroke(220, 220, 220);
    this.ghostPath.forEach((line) => {
      this.p.line(line.x1, line.y1, line.x2, line.y2);
    });

    this.ghostPath.forEach((line) => {
      this.p.fill(120, 120, 120);
      this.p.noStroke();
      this.p.ellipse(line.x2, line.y2, 5, 5);
    });
    this.p.stroke(220, 220, 220);
    this.p.strokeWeight(1);

    this.p.stroke(0);
    this.path.forEach((line) => {
      this.p.stroke(255, 255, 0);
      this.p.strokeWeight(1);
      this.p.line(line.x1, line.y1, line.x2, line.y2);
    });

    this.p.stroke(0, 0, 0);

    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.p.radians(this.angle));
    this.p.rectMode(this.p.CENTER);
    this.p.fill(255, 0, 0);
    this.p.rect(0, 0, 50, 30);
    this.p.fill(0);
    this.p.ellipse(-15, 15, 10, 10);
    this.p.ellipse(15, 15, 10, 10);
    this.p.ellipse(-15, -15, 10, 10);
    this.p.ellipse(15, -15, 10, 10);
    this.p.pop();
  }

  resetAnimation() {
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.currentCommandIndex = 0;
    this.distanceMoved = 0;
    this.angleTurned = 0;
    this.path = [];
    this.isComplete = false;
    this.calculateGhostPath();
    this.checkedLines = new Array(this.ghostPath.length).fill(false);
  }

  private calculateGhostPath() {
    this.ghostPath = [];
    let ghostX = 200;
    let ghostY = 300;
    let ghostAngle = 0;

    this.ghostCommands.forEach((command) => {
      switch (command.type) {
        case "forward":
        case "backward": {
          const distance = command.distance * distanceModifier;
          const direction = command.type === "backward" ? -1 : 1;
          const dx =
            this.p.cos(this.p.radians(ghostAngle)) * distance * direction;
          const dy =
            this.p.sin(this.p.radians(ghostAngle)) * distance * direction;

          const newX = ghostX + dx;
          const newY = ghostY + dy;

          if (command.type === "forward" || command.type === "backward") {
            this.ghostPath.push({ x1: ghostX, y1: ghostY, x2: newX, y2: newY });
          }

          ghostX = newX;
          ghostY = newY;
          break;
        }
        case "turnCounterClockwise":
          ghostAngle -= command.degrees;
          break;
        case "turnClockwise":
          ghostAngle += command.degrees;
          break;
      }
    });
  }

  check(): boolean {
    let allChecked = true;
    for (let i = 0; i < this.ghostPath.length; i++) {
      const ghostLine = this.ghostPath[i];
      const actualLine = this.path.find((line) => linePass(line, ghostLine));
      if (actualLine) {
        this.checkedLines[i] = true;
      } else {
        allChecked = false;
        break;
      }
    }
    return allChecked;
  }
}
