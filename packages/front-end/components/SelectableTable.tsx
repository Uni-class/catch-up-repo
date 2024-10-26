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
import Button from "@/components/Button/Button";

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
  pagination?: {
    currentPageIndex: number;
    totalPageCount: number;
    pageRequested: (pageIndex: number) => void;
  };
}

export default function SelectableTable({
  head,
  body,
  placeholder,
  selectedItems,
  setSelectedItems,
  pagination,
}: PropType) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1.5em",
      })}
    >
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
                            selectedItems.filter((id) => id !== item.id),
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
                          className={css({
                            width: "100%",
                            padding: "0.35rem 0",
                          })}
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
      {pagination ? (
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            "&>button": {
              width: "2.4em",
              height: "2.4em",
            },
          })}
        >
          <Button onClick={() => pagination.pageRequested(0)}>{"<<"}</Button>
          <Button
            onClick={() =>
              pagination.pageRequested(pagination.currentPageIndex - 1)
            }
          >
            {"<"}
          </Button>
          {[
            ...[...Array(Math.min(pagination.currentPageIndex, 3)).keys()].map(
              (item) =>
                pagination.currentPageIndex -
                Math.min(pagination.currentPageIndex, 3) +
                item,
            ),
            ...[
              ...Array(
                Math.min(
                  pagination.totalPageCount - pagination.currentPageIndex,
                  4,
                ),
              ).keys(),
            ].map((item) => pagination.currentPageIndex + item),
          ].map((index) => {
            return (
              <Button
                key={index}
                color={
                  index == pagination.currentPageIndex ? "secondary" : "gray"
                }
                onClick={() => pagination.pageRequested(index)}
              >
                {index + 1}
              </Button>
            );
          })}
          <Button
            onClick={() =>
              pagination.pageRequested(pagination.currentPageIndex + 1)
            }
          >
            {">"}
          </Button>
          <Button
            onClick={() => pagination.pageRequested(pagination.totalPageCount)}
          >
            {">>"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
