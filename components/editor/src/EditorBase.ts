import { type Container, tsParticles } from "@tsparticles/engine";
import type { EditorGroup } from "object-gui";
import { editorChangedEvent } from "./Utils";

export abstract class EditorBase {
    protected constructor(protected readonly particles: () => Container) {}

    notifyEditorChanged(): void {
        tsParticles.dispatchEvent(editorChangedEvent, {
            container: this.particles(),
        });
    }

    abstract addToGroup(parent: EditorGroup, options?: () => unknown): void;
}
