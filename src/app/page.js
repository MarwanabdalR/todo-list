import KanbanBoard from "@/components/MainPage/KanbanBoard";

export default function Home() {
  return (
    <>
      <div>
        You cant update or delete or add data duo to json-server library we
        should use real database or server to solve this issue🤓, or you can
        basicly download the repo and do <code>npm i</code>
      </div>
      <KanbanBoard />
    </>
  );
}
