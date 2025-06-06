
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import ComercialTabs from "@/components/comercial/components/ComercialTabs";

const ComercialVendas = () => {
  return (
    <SidebarLayout>
      <div className="p-6">
        <ComercialTabs />
      </div>
    </SidebarLayout>
  );
};

export default ComercialVendas;
