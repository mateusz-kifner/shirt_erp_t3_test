import { useLocalStorage } from "@mantine/hooks";
import { IconNote, IconNoteOff } from "@tabler/icons-react";
import { useId } from "react";
import ActionButton from "../basic/ActionButton";
import ScrollArea from "../basic/ScrollArea";
import SimpleTooltip from "../basic/SimpleTooltip";

// Scroll in color palette will not work in modal due to radix bug (25.05.2023)

interface ColorSwatchesProps {
  colors: { [key: string]: { [key: string]: string } };
  onClick?: (hex: string) => void;
  className: string;
}

function ColorSwatches(props: ColorSwatchesProps) {
  const { colors, onClick, className } = props;
  const uuid = useId();
  const [colorTooltip, setColorTooltip] = useLocalStorage({
    key: "colorTooltip",
    defaultValue: true,
  });
  return (
    <ScrollArea className={`relative ${className ?? ""}`}>
      <div className="relative flex w-fit flex-col gap-4">
        <ActionButton
          className="absolute
            right-4
            top-0 
            border-none p-0
            hover:bg-transparent
            dark:hover:bg-transparent
            "
          onClick={() => setColorTooltip((v) => !v)}
        >
          {colorTooltip ? <IconNote /> : <IconNoteOff />}
        </ActionButton>
        {Object.keys(colors).map((key, index) => (
          <div key={`${key}_${index}_${uuid}`} className="flex flex-col gap-2">
            {!key.startsWith("_") && <span className="pl-2">{key}</span>}
            <div className="flex flex-wrap gap-2">
              {Object.keys(colors[key]!).map((colorName, colorIndex) =>
                colorTooltip ? (
                  <SimpleTooltip
                    key={`${key}_${index}_${colorIndex}_${uuid}`}
                    tooltip={colorName}
                    position="top"
                    align={
                      colorIndex % 11 < 2
                        ? "start"
                        : colorIndex % 11 > 8
                        ? "end"
                        : "center"
                    }
                  >
                    <div
                      className="h-[1.5rem] w-[1.5rem] rounded"
                      style={{ background: colors[key]![colorName] }}
                      onClick={() => onClick?.(colors[key]![colorName]!)}
                    ></div>
                  </SimpleTooltip>
                ) : (
                  <div
                    key={`${key}_${index}_${colorIndex}_${uuid}`}
                    className="h-[1.5rem] w-[1.5rem] rounded"
                    style={{ background: colors[key]![colorName] }}
                    onClick={() => onClick?.(colors[key]![colorName]!)}
                  ></div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default ColorSwatches;
