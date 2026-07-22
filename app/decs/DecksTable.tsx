"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "~/components/Table";
import styles from "./page.module.css";
import type { Deck } from "./mocks";

const columnHelper = createColumnHelper<Deck>();

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    meta: { className: styles.colTitle },
    cell: (info) => (
      <a href="#" className={styles.deckLink}>
        {info.getValue()}
      </a>
    ),
  }),
  columnHelper.accessor("modified", {
    header: "Modified",
    meta: { className: styles.colModified },
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
    meta: { className: styles.colNotes },
  }),
];

export default function DecksTable({ decks }: { decks: Deck[] }) {
  return <Table data={decks} columns={columns} />;
}
