import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="px-5 sm:px-10 lg:px-20 xl:px-40 mt-80">
      <div className="border-2 rounded-2xl shadow-sm">
        <div className="pl-9 py-5">
          <Skeleton className="h-6 w-32" />
        </div>

        <Table>
          <TableBody className="bg-gray-50">
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="pl-10">
                  <Skeleton className="h-12 w-20 rounded-md" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-4 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}