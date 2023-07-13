import type { Container } from "tsparticles-engine";
import { ParticlesEditor } from "./ParticlesEditor";

/**
 *
 * @param container -
 * @returns the editor instance
 */
export function showEditor(container: Container): ParticlesEditor {
    return new ParticlesEditor(container);
}
