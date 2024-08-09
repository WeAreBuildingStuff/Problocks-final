import p5 from "p5";

export class TileConnectionGame {
  private marginLeft: number = 30;
  private marginTop: number = 30;
  private p: p5;
  private commands: (TileCommands | ControlCommands)[];
  private connections: { start: string; end: string }[];
  private animatedConnections: {
    start: string;
    end: string;
    progress: number;
  }[];
  private ghostConnections: { start: string; end: string }[];
  private currentAnimationIndex: number;
  private tileSize: number;
  private rows: number = 10;
  private cols: number = 10;
  constructor(p: p5, commands: TileCommands[], toDoCommands: TileCommands[]) {
    this.p = p;
    this.commands = commands;
    this.connections = [];
    this.animatedConnections = [];
    this.ghostConnections = [];
    this.currentAnimationIndex = 0;
    this.processCommands(toDoCommands);
    this.tileSize = 40;

    this.resetAnimation();
  }

  update() {
    this.updateAnimation();
  }

  display() {
    this.p.background(255);
    this.drawGrid();
    this.drawLabels();
    this.drawGhostConnections();
    this.drawConnections();
  }

  resetAnimation() {
    this.connections = [];
    this.animatedConnections = this.commands
      .filter((command): command is TileCommands => command.type === "connect")
      .map((command) => ({
        start: command.start.toUpperCase(),
        end: command.end.toUpperCase(),
        progress: 0,
      }));
    this.currentAnimationIndex = 0;
  }

  private processCommands(commands: (TileCommands | ControlCommands)[]) {
    this.ghostConnections = commands
      .filter((command): command is TileCommands => command.type === "connect")
      .map((command) => ({
        start: command.start.toUpperCase(),
        end: command.end.toUpperCase(),
      }));
  }

  private updateAnimation() {
    console.log(this.currentAnimationIndex, this.animatedConnections.length);
    if (this.currentAnimationIndex < this.animatedConnections.length) {
      const currentConnection =
        this.animatedConnections[this.currentAnimationIndex];
      currentConnection.progress += 0.02;

      if (currentConnection.progress >= 1) {
        currentConnection.progress = 1;

        this.connections.push({
          start: currentConnection.start,
          end: currentConnection.end,
        });
        this.currentAnimationIndex++;
      }
    }
  }

  private drawGrid() {
    this.p.stroke(0);
    this.p.noFill();
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.p.rect(
          this.marginLeft + i * this.tileSize,
          this.marginTop + j * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }

  private drawLabels() {
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.textSize(12);
    this.p.fill(0);
    this.p.noStroke();

    for (let i = 0; i < this.cols; i++) {
      const label = String.fromCharCode("A".charCodeAt(0) + i);
      this.p.text(
        label,
        this.marginLeft + (i + 0.5) * this.tileSize,
        this.marginTop / 2
      );
    }

    for (let j = 0; j < this.rows; j++) {
      const label = (j + 1).toString();
      this.p.text(
        label,
        this.marginLeft / 2,
        this.marginTop + (j + 0.5) * this.tileSize
      );
    }
  }

  private drawConnections() {
    this.p.stroke(255, 0, 0);
    this.p.strokeWeight(4);

    for (const connection of this.connections) {
      this.drawLine(connection.start, connection.end, 1);
    }

    if (this.currentAnimationIndex < this.animatedConnections.length) {
      const currentConnection =
        this.animatedConnections[this.currentAnimationIndex];
      this.drawLine(
        currentConnection.start,
        currentConnection.end,
        currentConnection.progress
      );
    }
  }

  private drawGhostConnections() {
    this.p.strokeWeight(2);
    this.p.stroke(180, 180, 180);

    for (const connection of this.ghostConnections) {
      this.drawLine(connection.start, connection.end, 1);
    }

    for (const connection of this.ghostConnections) {
      const [endCol, endRow] = connection.end.split("");
      const endX =
        this.marginLeft +
        (endCol.charCodeAt(0) - "A".charCodeAt(0)) * this.tileSize +
        this.tileSize / 2;
      const endY =
        this.marginTop +
        (parseInt(endRow) - 1) * this.tileSize +
        this.tileSize / 2;

      this.p.fill(180, 180, 180);
      this.p.noStroke();
      this.p.ellipse(endX, endY, 5, 5);
    }

    this.p.fill(255, 255, 255);
    this.p.stroke(255, 255, 255);
  }

  private drawLine(start: string, end: string, progress: number) {
    const [startCol, startRow] = start.toUpperCase().split("");
    const [endCol, endRow] = end.toUpperCase().split("");
    const startX =
      this.marginLeft +
      (startCol.charCodeAt(0) - "A".charCodeAt(0)) * this.tileSize +
      this.tileSize / 2;
    const startY =
      this.marginTop +
      (parseInt(startRow) - 1) * this.tileSize +
      this.tileSize / 2;
    const endX =
      this.marginLeft +
      (endCol.charCodeAt(0) - "A".charCodeAt(0)) * this.tileSize +
      this.tileSize / 2;
    const endY =
      this.marginTop +
      (parseInt(endRow) - 1) * this.tileSize +
      this.tileSize / 2;
    const progressX = startX + (endX - startX) * progress;
    const progressY = startY + (endY - startY) * progress;
    this.p.line(startX, startY, progressX, progressY);
  }
}
