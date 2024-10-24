import {
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Th,
  Td,
} from "@/components/Table";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Checkbox from "@/components/Checkbox";
import { css } from "@/styled-system/css";

interface PropType {
  head: {
    id: number;
    value: ReactNode;
    width?: string;
    minWidth?: string;
    align?: "left" | "right" | "center";
  }[];
  body: {
    id: number;
    values: ReactNode[];
    onClick?: () => void;
  }[];
  placeholder?: ReactNode;
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
}

export default function SelectableTable({
  head,
  body,
  placeholder,
  selectedItems,
  setSelectedItems,
}: PropType) {
  return (
    <TableContainer className={css({ marginTop: "0.35rem" })}>
      <TableHead>
        <TableRow>
          <Th width="3em">
            <Checkbox
              checked={
                body.length === selectedItems.length &&
                selectedItems.length !== 0
              }
              onChange={() => {
                if (body.length === selectedItems.length) {
                  setSelectedItems([]);
                } else {
                  setSelectedItems(body.map((item) => item.id));
                }
              }}
              disabled={body.length === 0}
            />
          </Th>
          {head.map((item) => {
            return (
              <Th
                key={item.id}
                style={{
                  width: item.width,
                  minWidth: item.minWidth,
                }}
                align={item.align ? item.align : "center"}
              >
                <div className={css({ width: "100%", padding: "0.35rem 0" })}>
                  {item.value}
                </div>
              </Th>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {body.length === 0 ? (
          <TableRow>
            <Td colSpan={head.length + 1}>{placeholder}</Td>
          </TableRow>
        ) : (
          body.map((item) => {
            return (
              <TableRow key={item.id} onClick={item.onClick}>
                <Td onClick={(event) => event.stopPropagation()}>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => {
                      if (selectedItems.includes(item.id)) {
                        setSelectedItems(
                          selectedItems.filter((id) => id !== item.id)
                        );
                      } else {
                        setSelectedItems([...selectedItems, item.id]);
                      }
                    }}
                    onClick={(event) => event.stopPropagation()}
                  />
                </Td>
                {item.values.map((value, index) => {
                  return (
                    <Td key={index} align={index === 0 ? "left" : "center"}>
                      <div
                        className={css({ width: "100%", padding: "0.35rem 0" })}
                      >
                        {value}
                      </div>
                    </Td>
                  );
                })}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </TableContainer>
  );
}
