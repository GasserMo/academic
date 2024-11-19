import ChildDetails from "@/app/_components/parent/ChildDetails";

function Page(context) {
    const { id } = context.params;
    return (
        <div>
            <ChildDetails id={id} />
        </div>
    );
}

export default Page;