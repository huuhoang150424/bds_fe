import "./style1.css";
import { cn } from "@/lib/utils";
interface Props {
  className?: String
}


const Loader:React.FC<Props>=({className}) =>{
	return (
		<div className={ cn(`loader mx-auto  my-[100px] `,className)}>
			<div className="box box-1 mt-[200px] ">
				<div className="side-left" />
				<div className="side-right" />
				<div className="side-top" />
			</div>
			<div className="box box-2">
				<div className="side-left" />
				<div className="side-right" />
				<div className="side-top" />
			</div>
			<div className="box box-3">
				<div className="side-left" />
				<div className="side-right" />
				<div className="side-top" />
			</div>
			<div className="box box-4">
				<div className="side-left" />
				<div className="side-right" />
				<div className="side-top" />
			</div>
		</div>
	)
}
export default Loader;
