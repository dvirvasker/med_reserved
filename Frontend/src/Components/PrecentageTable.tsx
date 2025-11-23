import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { iMagadData, iUnitData } from "../interfaces";
import { collectUniqueUnits, getTotalCount, rowTotals, sumForMagad } from "../assets/Functions/precentageTableHandlers";
interface iPrecentageTable {
  magadData: iMagadData,
  onSelect: (selectedOption: string) => void
}

const PrecentageTable: React.FC<iPrecentageTable> = ({ magadData, onSelect }) => {
  const CenteredTableCell = styled(TableCell)({ margin: "auto", textAlign: "center" });
  const StickyTableCell = styled(CenteredTableCell)(({ theme }) => ({ position: "sticky", left: 0, backgroundColor: theme.palette.primary.main }));

  const uniqueUnits = collectUniqueUnits(magadData);
  const FormattedData = ({ data }: { data?: iUnitData }) => {
    if (!data) {
      return <Typography fontWeight="bold">X</Typography>;
    }

    const { trueCount, falseCount } = data;
    const percentage = (trueCount / (trueCount + falseCount)) * 100;
    const displayValue = `${trueCount}/${trueCount + falseCount}`;

    const StyledBox = styled(Box)(({ theme }) => ({
      color: percentage < 20 ? theme.palette.error.main : percentage < 80 ? theme.palette.warning.main : theme.palette.success.main
    }));

    return (
      <StyledBox>
        <Typography fontWeight="bold">{percentage.toFixed(2)}%</Typography>
        <Typography>{displayValue}</Typography>
      </StyledBox>
    );
  };

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {/*empty table cell*/}
          <StickyTableCell></StickyTableCell>
          {Object.keys(magadData).map((rowHeader) => (
            <StickyTableCell key={rowHeader}>
              <Typography variant="h6">{magadData[rowHeader].title}</Typography>
            </StickyTableCell>
          ))}
          <StickyTableCell>
            <Typography variant="h6">הכל</Typography>
          </StickyTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(uniqueUnits).map(unitId => (
          <TableRow key={unitId}>
            <StickyTableCell onClick={() => onSelect(unitId)}>
              <Typography variant="h6">{uniqueUnits[unitId]}</Typography>
            </StickyTableCell>
            {Object.keys(magadData).map(rowHeader => (
              <CenteredTableCell key={rowHeader}>
                <FormattedData data={magadData[rowHeader].items[unitId]} />
              </CenteredTableCell>
            ))}
            <CenteredTableCell>
              <FormattedData data={getTotalCount(magadData, unitId)} />
            </CenteredTableCell>
          </TableRow>
        ))}
        <TableRow>
          <StickyTableCell>
            <Typography variant="h6">הכל</Typography>
          </StickyTableCell>
          {Object.keys(magadData).map((rowHeader) => (
            <CenteredTableCell key={rowHeader}>
              <FormattedData data={sumForMagad(magadData, rowHeader)} />
            </CenteredTableCell>
          ))}
          <CenteredTableCell><FormattedData data={rowTotals(magadData)} /></CenteredTableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PrecentageTable;