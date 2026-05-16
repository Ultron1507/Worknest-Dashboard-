import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { getAdminUsers, queryKeys } from "../../lib/api/queries";
import { absoluteUploadUrl, getInitials } from "../../lib/utils";

export default function Users() {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: [...queryKeys.adminUsers, page],
    queryFn: () => getAdminUsers({ page, limit }),
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalUsers = data?.totalCount || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isLoading ? "Loading registered users..." : `${totalUsers} registered users`}
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-3 p-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/60 text-muted-foreground">
                  <tr>
                    <th className="p-4 text-left font-medium">User</th>
                    <th className="p-4 text-left font-medium">Email</th>
                    <th className="p-4 text-left font-medium">Role</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td className="p-6 text-center text-muted-foreground" colSpan="5">No registered users found.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="border-t transition-colors hover:bg-muted/35">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={absoluteUploadUrl(user.avatar || user.profileImage)} alt={user.name || "User"} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name || "Unnamed user"}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{user.email || "-"}</td>
                        <td className="p-4">
                          <Badge className="capitalize">{user.role || "user"}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={user.status === "inactive" ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-600"}>
                            {user.status || "active"}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Simple Pagination Controls */}
      <div className="flex justify-end gap-2">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          disabled={users.length < limit}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
