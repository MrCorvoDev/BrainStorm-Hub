interface CreateQuestionProps {
   questionName: string;
   setQuestionName: React.Dispatch<React.SetStateAction<string>>;
}
const CreateQuestion = ({
   questionName,
   setQuestionName,
}: CreateQuestionProps) => {
   console.log(questionName);
   return <></>;
};
export default CreateQuestion;
