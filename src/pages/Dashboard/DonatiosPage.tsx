import { useEffect } from "react";
import { Table } from "../../components/Table";
import { useDonationStore } from "../../store/DonationStore";
import { useCategoryStore } from "../../store/CategoryStore";
import { useAuthStore } from "../../store/AuthStore";
import { formatISODate } from "../../utils/formatISODate";

export const DashboardDonationsPage = () => {
  const { donationPagination, fetchDonations } = useDonationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { allProfiles, fetchAllProfiles } = useAuthStore();

  useEffect(() => {
    // Almacena las llamadas a las funciones en una variable para evitar advertencias.
    const fetchData = () => {
      fetchAllProfiles();
      fetchDonations();
      fetchCategories();
    };

    fetchData();
  }, []); // El array de dependencias vacío es la clave para que se ejecute solo una vez al montar.

  const handleDelete = (id: string | number) => {
    // Handle delete action
    console.log(id);
  };

  return (
    <div className="container mx-auto">
      <h1 className=" self-start text-2xl font-bold mb-4 pl-4 pt-8">
        Donations
      </h1>

      <Table
        headers={[
          { key: "id", label: "ID" },
          { key: "user", label: "User" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "category", label: "Category" },
          { key: "date", label: "Date" },
        ]}
        dataTable={donationPagination.data.map((donation) => ({
          id: donation.id,
          user:
            allProfiles!.find(
              (user) => String(user.id) == String(donation.donorId)
            )?.name || "Unknown",
          title: donation.title,
          description: donation.description,
          category:
            categories.find((cat) => cat.id === donation.categoryId)?.title ||
            "Unknown",
          date: donation.createdAt
            ? formatISODate("" + donation.createdAt)
            : undefined,
        }))}
        showEditButton={false}
        onDelete={handleDelete}
      />
    </div>
  );
};
