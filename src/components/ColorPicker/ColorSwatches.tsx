import { useId } from "react";
import ScrollArea from "../basic/ScrollArea";
import SimpleTooltip from "../basic/SimpleTooltip";

// Scroll in color palette will not work in modal due to radix bug (25.05.2023)

interface ColorSwatchesProps {
  colors: { [key: string]: { [key: string]: string } };
  onClick?: (hex: string) => void;
}

function ColorSwatches(props: ColorSwatchesProps) {
  const { colors, onClick } = props;
  const uuid = useId();

  return (
    <ScrollArea className="relative">
      <div className="flex w-fit flex-col gap-4">
        {Object.keys(colors).map((key, index) => (
          <div key={`${key}_${index}_${uuid}`} className="flex flex-col gap-2">
            {!key.startsWith("_") && <span className="pl-2">{key}</span>}
            <div className="flex flex-wrap gap-2">
              {Object.keys(colors[key]!).map((colorName, colorIndex) => (
                <SimpleTooltip
                  key={`${key}_${index}_${colorIndex}_${uuid}`}
                  tooltip={colorName}
                  position="top"
                >
                  <div
                    className="h-[1.5rem] w-[1.5rem] rounded"
                    style={{ background: colors[key]![colorName] }}
                    onClick={() => onClick?.(colors[key]![colorName]!)}
                  ></div>
                </SimpleTooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default ColorSwatches;
