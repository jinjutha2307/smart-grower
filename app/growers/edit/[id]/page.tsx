"use client";
import GrowerRegisterPage from "@/app/growers/register/page";
import { GrowersFormData } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGrowerById } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function GrowerEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [growerData, setGrowerData] = useState<GrowersFormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchGrowerData() {
    setIsLoading;
    if (params.id) {
      const res = await getGrowerById(params.id);
      if (!res) {
        router.push("/404");
      }
      setGrowerData(res);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchGrowerData();
  }, [params.id, router]);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner
            size="lg
        "
          />
        </div>
      ) : (
        <GrowerRegisterPage growerData={growerData} />
      )}
    </>
  );
}
