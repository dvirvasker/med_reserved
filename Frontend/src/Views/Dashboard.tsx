import { Box, Grid } from "@mui/material";
import Card from "../Components/Card";
import DashboardCard from "../Components/DashboardCard";
import { DashboardFooter } from "../Components/Footer";
import { DashboardNavbar } from "../Components/Navbar";

const DashboardView = () => {
	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<DashboardNavbar
				setSearch={value => console.log(value)}
				depth={[
					{ id: "magadal6", value: "התייצבות" },
					{ id: "magad2", value: "מרחב" },
					{ id: "mkabaz5", value: "יחידה" },
				]}
			/>
			<Card
				style={{ height: "100%", display: "flex", flexDirection: "column" }}
			>
				<Grid container spacing={3}>
					{Array.from({ length: 12 }).map((_, index) => (
						<Grid item key={index} xs={4} xl={2} sm={3}>
							<DashboardCard
								redThres={30}
								yellowThres={70}
								title="התייצבות יומית"
								upperDescription="יחידה"
								// lowerDescription={["סדיר", "הכן", "אחי"]}
								trueCount={400}
								falseCount={200}
								tipulCount={30}
								tipulHHCount={1}
								harigTipulCount={400}
								harigTipulHHCount={3}
								mizdamenetHHCount={32}
								mizdamenetCount={123}
							/>
						</Grid>
					))}
				</Grid>
			</Card>
			<DashboardFooter />
		</Box>
	);
};

export default DashboardView;
