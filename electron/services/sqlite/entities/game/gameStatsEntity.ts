import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GameStats } from '../../../../../frontend/src/lib/models/types/slippiData';
import { GameEndTypeEntity } from "./gameEndTypeEntity";
import { FrameEntryTypeEntity } from "./frameEntryTypeEntity";
import { PostGameStatsEntity } from "./postGameStatsEntity";
import { GameSettingsEntity } from "./gameSettingsEntity";

@Entity()
export class GameStatsEntity implements GameStats {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GameEndTypeEntity, { cascade: true, onDelete: "CASCADE", eager: true })
  @JoinColumn()
  gameEnd: GameEndTypeEntity;

  @Column({ type: "integer", default: false })
  isMock: boolean;

  @Column({ type: "integer", default: false })
  isReplay: boolean;

  // @OneToOne(() => FrameEntryTypeEntity, { cascade: true, onDelete: "CASCADE", eager: true })
  // @JoinColumn()
  @Column({ type: "simple-json", nullable: true })
  lastFrame: FrameEntryTypeEntity | null;

  @OneToOne(() => PostGameStatsEntity, { cascade: true, onDelete: "CASCADE", eager: true })
  @JoinColumn()
  postGameStats: PostGameStatsEntity | null;

  @Column({ type: "simple-json", default: "[0,0]" })
  score: number[];

  /** Host override of the result (winner side + why) — see GameStats.resultOverride. */
  @Column({ type: "simple-json", nullable: true })
  resultOverride: { winnerSlot: 0 | 1 | null; note: string } | null;

  /** Host side swaps for the set (on its first game) — see GameStats.sides. */
  @Column({ type: "simple-json", nullable: true })
  sides: { swapped?: boolean; teamOrder?: [boolean, boolean] } | null;

  /** Highlights marked in this game (frames + score) — see GameStats.highlights. */
  @Column({ type: "simple-json", nullable: true })
  highlights: { startFrame: number; endFrame: number; score: number }[] | null;

  /** The replay file (relative to the Slippi replay folder) — see GameStats.replayPath. */
  @Column({ type: "text", nullable: true })
  replayPath: string | null;

  @OneToOne(() => GameSettingsEntity, { cascade: true, eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  settings: GameSettingsEntity | null;

  @Column({ type: "datetime", nullable: true })
  timestamp: Date | null;

}

