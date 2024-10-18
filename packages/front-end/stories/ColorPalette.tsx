import { css } from "@/styled-system/css";
import { Recursive, Token } from "@/styled-system/types/composition";

export default function ColorPalette({
  palette,
  title,
}: {
  palette?:
    | { [key in number | string]: { value: string } }
    | Token<string>
    | Recursive<Token<string>>;
  title: string;
}) {
  return (
    <section>
      <h2
        className={css({
          fontWeight: "semibold",
          fontSize: "1.5rem",
          margin: "1rem 0",
        })}
      >
        {title}
      </h2>
      <div className={css({ display: "flex", flexWrap: "wrap", gap: "1rem" })}>
        {palette &&
          Object.entries(palette).map(([key, value]) => (
            <div
              key={key}
              className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.35rem",
              })}
            >
              <div
                className={css({
                  width: "5em",
                  height: "5em",
                  border: "1px solid",
                  borderColor: "grey.200",
                })}
                style={{
                  backgroundColor: value.value,
                }}
              />
              <p>{key}</p>
              <p className={css({ fontSize: "0.75rem", opacity: "0.8" })}>
                {value.value}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}
