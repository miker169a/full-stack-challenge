import { Flex, Input, Select } from "@chakra-ui/react";
import { Event } from "../../services/generated/eventsApi";

interface FilterProps {
  sortBy: keyof Event | undefined;
  setSortBy: (value: keyof Event | undefined) => void;
  order: "asc" | "desc";
  setOrder: (value: "asc" | "desc") => void;
  filterType: "name" | "description";
  setFilterType: (value: "name" | "description") => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterValueInputRef: React.RefObject<HTMLInputElement>;
}

export const Filters: React.FC<FilterProps> = ({
  sortBy,
  setSortBy,
  order,
  setOrder,
  filterType,
  setFilterType,
  filterValue,
  handleFilterValueChange,
  filterValueInputRef,
}) => (
  <Flex justifyContent="space-between">
    <Select
      placeholder="Sort By"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as keyof Event)}
    >
      <option value="name">Name</option>
      <option value="date">Date</option>
    </Select>
    <Select
      placeholder="Order"
      value={order}
      onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </Select>
    <Select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value as "name" | "description")}
    >
      <option value="name">Name</option>
      <option value="description">Description</option>
    </Select>
    <Input
      placeholder="Filter Value"
      value={filterValue}
      onChange={handleFilterValueChange}
      ref={filterValueInputRef}
    />
  </Flex>
);
