import p5 from 'p5';

const distanceModifier = 50;
const commandDelay = 200; // 200ms delay

export class DrawingBotGame {
  private p: p5;
  private commands: DrawingBotCommands[];
  private ghostCommands: DrawingBotCommands[];
  private x: number;
  private y: number;
  private angle: number;
  private penDown: boolean;
  private currentCommandIndex: number;
  private distanceRemaining: number;
  private turnDegreesRemaining: number;
  private lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  private ghostLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  private isAnimating: boolean;

  constructor(p: p5, commands: DrawingBotCommands[], ghostCommands: DrawingBotCommands[] = []) {
    this.p = p;
    this.commands = commands;
    this.ghostCommands = ghostCommands;
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.penDown = true;
    this.currentCommandIndex = 0;
    this.distanceRemaining = 0;
    this.turnDegreesRemaining = 0;
    this.isAnimating = false;
    this.calculateGhostPath();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async processCommand() {
    if (this.currentCommandIndex < this.commands.length) {
      const currentCommand = this.commands[this.currentCommandIndex];

      switch (currentCommand.type) {
        case 'forward':
          if (this.distanceRemaining <= 0) {
            this.distanceRemaining = currentCommand.distance * distanceModifier;
          }
          this.moveBot();
          break;
        case 'backward':
          if (this.distanceRemaining <= 0) {
            this.distanceRemaining = currentCommand.distance * distanceModifier;
          }
          this.moveBot(true);
          break;
        case 'turnCounterClockwise':
          if (this.turnDegreesRemaining <= 0) {
            this.turnDegreesRemaining = currentCommand.degrees;
          }
          this.turnBot(true);
          break;
        case 'turnClockwise':
          if (this.turnDegreesRemaining <= 0) {
            this.turnDegreesRemaining = currentCommand.degrees;
          }
          this.turnBot();
          break;
        case 'penUp':
          this.penDown = false;
          this.currentCommandIndex++;
          await this.delay(commandDelay);
          break;
        case 'penDown':
          this.penDown = true;
          this.currentCommandIndex++;
          await this.delay(commandDelay);
          break;
      }
    }
  }

  async update() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      await this.processCommand();
      this.isAnimating = false;
    }
  }

  display() {
    this.p.clear();

    this.p.strokeWeight(3);
    this.p.stroke(0, 0, 0, 20);
    this.ghostLines.forEach((line) => {
      this.p.line(line.x1, line.y1, line.x2, line.y2);
    });

    this.ghostLines.forEach((line) => {
      this.p.fill(120, 120, 120)
      this.p.noStroke()
      this.p.ellipse(line.x2, line.y2, 5, 5)
    })

    this.p.strokeWeight(5);

    this.p.stroke(0);
    this.lines.forEach((line) => {
      this.p.line(line.x1, line.y1, line.x2, line.y2);
    });

    this.p.strokeWeight(2);
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.p.radians(this.angle));

    this.p.noFill();
    this.p.stroke(0, 0, 0);
    this.p.ellipse(0, 0, 20, 20);

    this.p.fill(255, 0, 0);
    this.p.noStroke();
    this.p.triangle(30, 0, 15, 7.5, 15, -7.5);
    this.p.pop();
  }

  resetAnimation() {
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.penDown = true;
    this.currentCommandIndex = 0;
    this.distanceRemaining = 0;
    this.turnDegreesRemaining = 0;
    this.lines = [];
    this.calculateGhostPath();
  }

  private moveBot(backward: boolean = false) {
    if (this.distanceRemaining > 0) {
      const maxStep = Math.min(1, this.distanceRemaining);
      const direction = backward ? -1 : 1;
      const dx = this.p.cos(this.p.radians(this.angle)) * maxStep * direction;
      const dy = this.p.sin(this.p.radians(this.angle)) * maxStep * direction;

      const newX = this.x + dx;
      const newY = this.y + dy;

      if (this.penDown) {
        this.lines.push({ x1: this.x, y1: this.y, x2: newX, y2: newY });
      }

      this.x = newX;
      this.y = newY;
      this.distanceRemaining -= Math.abs(maxStep);

      if (this.distanceRemaining <= 0) {
        this.distanceRemaining = 0;
        this.currentCommandIndex++;
      }
    }
  }

  private turnBot(counterClockwise: boolean = false) {
    if (this.turnDegreesRemaining > 0) {
      const step = 1;
      const direction = counterClockwise ? -1 : 1;

      this.angle += step * direction;
      this.turnDegreesRemaining -= Math.abs(step);

      if (this.turnDegreesRemaining <= 0) {
        this.turnDegreesRemaining = 0;
        this.currentCommandIndex++;
      }
    }
  }

  private calculateGhostPath() {
    this.ghostLines = [];
    let ghostX = 200;
    let ghostY = 300;
    let ghostAngle = 0;
    let penDown = true;

    this.ghostCommands.forEach((command) => {
      switch (command.type) {
        case 'forward':
        case 'backward': {
          const distance = command.distance * distanceModifier;
          const direction = command.type === 'backward' ? -1 : 1;
          const dx = this.p.cos(this.p.radians(ghostAngle)) * distance * direction;
          const dy = this.p.sin(this.p.radians(ghostAngle)) * distance * direction;

          const newX = ghostX + dx;
          const newY = ghostY + dy;

          if (penDown) {
            this.ghostLines.push({ x1: ghostX, y1: ghostY, x2: newX, y2: newY });
          }

          ghostX = newX;
          ghostY = newY;
          break;
        }
        case 'turnCounterClockwise':
          ghostAngle -= command.degrees;
          break;
        case 'turnClockwise':
          ghostAngle += command.degrees;
          break;
        case 'penUp':
          penDown = false;
          break;
        case 'penDown':
          penDown = true;
          break;
      }
    });
  }
}
