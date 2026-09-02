import type { ReactElement } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { useIntl } from "react-intl";
import { KEYS } from "~/core/song-print/SongTranspose";

export interface SongPrintTransposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  targetKey: string;
  onTargetKeyChange: (key: string) => void;
  beforeChords: string[];
  afterChords: string[];
  /** Signed interval to the target key, -5..6. */
  semitones: number;
  onApply: () => void;
}

export function SongPrintTransposeModal({
  isOpen,
  onClose,
  currentKey,
  targetKey,
  onTargetKeyChange,
  beforeChords,
  afterChords,
  semitones,
  onApply,
}: SongPrintTransposeModalProps): ReactElement {
  const intl = useIntl();

  const summary =
    semitones === 0
      ? intl.formatMessage({
          description: "SongPrintTransposeModal: status - target key equals the current key",
          defaultMessage: "No change — pick a different key.",
          id: "Dz6r81",
        })
      : intl.formatMessage(
          {
            description: "SongPrintTransposeModal: status - interval and how many chords change",
            defaultMessage:
              "{semitones, plural, one {# semitone} other {# semitones}} · {chords, plural, one {# distinct chord} other {# distinct chords}} rewritten",
            id: "9gqGh7",
          },
          { semitones, chords: beforeChords.length }
        );

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog
            aria-label={intl.formatMessage({
              description: "SongPrintTransposeModal: aria-label - dialog",
              defaultMessage: "Transpose sheet",
              id: "lJz4t+",
            })}
          >
            <Modal.Header className="flex-col items-start gap-1">
              <Modal.Heading>
                {intl.formatMessage({
                  description: "SongPrintTransposeModal: heading - title",
                  defaultMessage: "Transpose sheet",
                  id: "sT5hBV",
                })}
              </Modal.Heading>
              <p className="text-default-500 text-sm">
                {intl.formatMessage({
                  description: "SongPrintTransposeModal: description - what applying does",
                  defaultMessage:
                    "Rewrites every chord in the song and saves it in the new key. The transpose offset is reset to 0.",
                  id: "QyJ9qT",
                })}
              </p>
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <span className="text-default-500 text-xs font-semibold tracking-wider uppercase">
                  {intl.formatMessage({
                    description: "SongPrintTransposeModal: label - target key picker",
                    defaultMessage: "Target key",
                    id: "o1tZRv",
                  })}
                </span>
                <ToggleButtonGroup
                  isDetached
                  selectionMode="single"
                  disallowEmptySelection
                  selectedKeys={[targetKey]}
                  onSelectionChange={(keys) => {
                    const next = [...keys][0];
                    if (next) onTargetKeyChange(String(next));
                  }}
                  className="grid grid-cols-6 gap-1.5"
                  aria-label={intl.formatMessage({
                    description: "SongPrintTransposeModal: aria-label - target key picker",
                    defaultMessage: "Target key",
                    id: "8RHPE8",
                  })}
                >
                  {KEYS.map((key) => (
                    <ToggleButton key={key} id={key} className="font-mono font-semibold">
                      {key}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>

              <div className="border-default-200 bg-default-100 flex items-center gap-3.5 rounded-xl border p-3.5">
                <div className="min-w-0 flex-1">
                  <div className="text-default-500 mb-1.5 text-[11px] font-semibold tracking-wider uppercase">
                    {intl.formatMessage(
                      {
                        description: "SongPrintTransposeModal: label - chords before transposing",
                        defaultMessage: "Before · {key}",
                        id: "xf0FGo",
                      },
                      { key: currentKey }
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {beforeChords.map((chord) => (
                      <span
                        key={chord}
                        className="bg-default-200 text-default-600 rounded-full px-2 py-0.5 font-mono text-xs font-semibold"
                      >
                        {chord}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowLongRightIcon className="text-default-400 size-5 flex-none" />

                <div className="min-w-0 flex-1">
                  <div className="text-accent mb-1.5 text-[11px] font-semibold tracking-wider uppercase">
                    {intl.formatMessage(
                      {
                        description: "SongPrintTransposeModal: label - chords after transposing",
                        defaultMessage: "After · {key}",
                        id: "Kfvhny",
                      },
                      { key: targetKey }
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {afterChords.map((chord, i) => (
                      <span
                        key={`${chord}-${i}`}
                        className="bg-accent/15 text-accent rounded-full px-2 py-0.5 font-mono text-xs font-semibold"
                      >
                        {chord}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-default-500 text-xs">{summary}</p>
            </Modal.Body>

            <Modal.Footer className="justify-end gap-2">
              <Button variant="tertiary" onPress={onClose}>
                {intl.formatMessage({
                  description: "SongPrintTransposeModal: button - dismiss without transposing",
                  defaultMessage: "Cancel",
                  id: "LwDCho",
                })}
              </Button>
              <Button variant="primary" isDisabled={semitones === 0} onPress={onApply}>
                {intl.formatMessage({
                  description: "SongPrintTransposeModal: button - apply the transpose",
                  defaultMessage: "Transpose & save",
                  id: "cT89GJ",
                })}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
