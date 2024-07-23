import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Td,
  Th,
} from "@/components/Table";
import { useRouter } from "@/hook/useRouter";
import { apiClient } from "@/util/axios";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function SessionTable() {
  const { queryObj } = useRouter();
  if (!queryObj["role"]) {
    queryObj["role"] = "participant";
  }
  const { data } = useSuspenseQuery({
    queryKey: ["user", "sessions", queryObj["role"]],
    queryFn: async () =>
      await apiClient.get("/user/sessions", { params: queryObj }),
  });
  return (
    <TableContainer>
      <colgroup>
        <col width="45px" />
        <col />
        <col width="30%" />
      </colgroup>
      <TableHead>
        <TableRow>
          <Th>
            <input type="checkbox" />
          </Th>
          <Th>제목</Th>
          <Th>참여 시간</Th>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.data.map((e: any) => (
          <TableRow key={e.id}>
            <Td>
              <input type="checkbox" />
            </Td>
            <Td>{e.displayName}</Td>
            <Td>{e.joinedAt}</Td>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
