import { type Container, tsParticles } from "@tsparticles/engine";
import type { EditorGroup } from "object-gui";
import { editorChangedEvent } from "./Utils";

export abstract class EditorBase {
    protected readonly particles;

    protected constructor(particles: () => Container) {
        this.particles = particles;
    }

    notifyEditorChanged(): void {
        tsParticles.dispatchEvent(editorChangedEvent, {
            container: this.particles(),
        });
    }

    abstract addToGroup(parent: EditorGroup, options?: () => unknown): void;
}
