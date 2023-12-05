import { Box, Button } from "@mui/material";
import Card from "../Components/Card";
import PrecentageTable from "../Components/PrecentageTable";
import { iMagadData } from "../interfaces";
import { downloadPrecentageTable } from "../assets/Functions/downloadTable";
import { DefaultNavbar } from "../Components/Navbar";

const ZminotTatYehidotView = () => {

    const magadData: iMagadData = {
        tanks: {
            title: "טנק",
            items: {
                "gdod 1": { trueCount: 5, falseCount: 15, title: "גדוד 1" },
                "gdod 3": { trueCount: 8, falseCount: 12, title: "גדוד 3" },
                "gdod 7": { trueCount: 6, falseCount: 14, title: "גדוד 7" },
                "gdod 9": { trueCount: 12, falseCount: 8, title: "גדוד 9" },
            }
        },
        nagmashim: {
            title: "נגמשים",
            items: {
                "gdod 2": { trueCount: 3, falseCount: 20, title: "גדוד 2" },
                "gdod 5": { trueCount: 4, falseCount: 100, title: "גדוד 5" },
                "gdod 8": { trueCount: 2, falseCount: 25, title: "גדוד 8" },
            }
        },
        bullets: {
            title: "אממוניציה",
            items: {
                "gdod 1": { trueCount: 50, falseCount: 10, title: "גדוד 1" },
                "gdod 3": { trueCount: 30, falseCount: 20, title: "גדוד 3" },
                "gdod 7": { trueCount: 40, falseCount: 15, title: "גדוד 7" },
            }
        },
        missiles: {
            title: "טילים",
            items: {
                "gdod 2": { trueCount: 8, falseCount: 2, title: "גדוד 2" },
                "gdod 5": { trueCount: 12, falseCount: 5, title: "גדוד 5" },
                "gdod 8": { trueCount: 5, falseCount: 15, title: "גדוד 8" },
            }
        },
        cars: {
            title: "מכוניות",
            items: {
                "gdod 10": { trueCount: 15, falseCount: 5, title: "גדוד 10" },
                "gdod 15": { trueCount: 20, falseCount: 2, title: "גדוד 15" },
                "gdod 20": { trueCount: 10, falseCount: 8, title: "גדוד 20" },
            }
        },
        guns: {
            title: "אקדחים",
            items: {
                "gdod 11": { trueCount: 25, falseCount: 3, title: "גדוד 11" },
                "gdod 16": { trueCount: 18, falseCount: 6, title: "גדוד 16" },
                "gdod 21": { trueCount: 12, falseCount: 10, title: "גדוד 21" },
            }
        },
        // Additional Magads...
        planes: {
            title: "מטוסים",
            items: {
                "gdod 12": { trueCount: 30, falseCount: 5, title: "גדוד 12" },
                "gdod 17": { trueCount: 22, falseCount: 8, title: "גדוד 17" },
                "gdod 22": { trueCount: 15, falseCount: 12, title: "גדוד 22" },
            }
        },
        ships: {
            title: "ספינות",
            items: {
                "gdod 13": { trueCount: 18, falseCount: 7, title: "גדוד 13" },
                "gdod 18": { trueCount: 25, falseCount: 3, title: "גדוד 18" },
                "gdod 23": { trueCount: 10, falseCount: 10, title: "גדוד 23" },
            }
        },
        helicopters: {
            title: "מסוקים",
            items: {
                "gdod 14": { trueCount: 12, falseCount: 10, title: "גדוד 14" },
                "gdod 19": { trueCount: 28, falseCount: 2, title: "גדוד 19" },
                "gdod 24": { trueCount: 16, falseCount: 6, title: "גדוד 24" },
            }
        },
        submarines: {
            title: "צוללות",
            items: {
                "gdod 25": { trueCount: 8, falseCount: 15, title: "גדוד 25" },
                "gdod 30": { trueCount: 18, falseCount: 5, title: "גדוד 30" },
                "gdod 35": { trueCount: 12, falseCount: 10, title: "גדוד 35" },
            }
        },
        satellites: {
            title: "לוויונים",
            items: {
                "gdod 26": { trueCount: 5, falseCount: 20, title: "גדוד 26" },
                "gdod 31": { trueCount: 15, falseCount: 8, title: "גדוד 31" },
                "gdod 36": { trueCount: 25, falseCount: 3, title: "גדוד 36" },
            }
        },
        bicycles: {
            title: "אופניים",
            items: {
                "gdod 27": { trueCount: 35, falseCount: 3, title: "גדוד 27" },
                "gdod 32": { trueCount: 12, falseCount: 18, title: "גדוד 32" },
                "gdod 37": { trueCount: 25, falseCount: 7, title: "גדוד 37" },
                // Adding more gdods to the "bicycles" category
                "gdod 42": { trueCount: 18, falseCount: 12, title: "גדוד 42" },
                "gdod 47": { trueCount: 22, falseCount: 8, title: "גדוד 47" },
                "gdod 52": { trueCount: 15, falseCount: 10, title: "גדוד 52" },
            }
        },
        rockets: {
            title: "רקטות",
            items: {
                "gdod 28": { trueCount: 15, falseCount: 10, title: "גדוד 28" },
                "gdod 33": { trueCount: 30, falseCount: 5, title: "גדוד 33" },
                "gdod 38": { trueCount: 22, falseCount: 7, title: "גדוד 38" },
                // Adding more gdods to the "rockets" category
                "gdod 41": { trueCount: 18, falseCount: 12, title: "גדוד 41" },
                "gdod 46": { trueCount: 25, falseCount: 5, title: "גדוד 46" },
                "gdod 51": { trueCount: 30, falseCount: 2, title: "גדוד 51" },
                "gdod 29": { trueCount: 18, falseCount: 15, title: "גדוד 29" },
                "gdod 30": { trueCount: 10, falseCount: 20, title: "גדוד 30" },
                "gdod 31": { trueCount: 22, falseCount: 8, title: "גדוד 31" },
                "gdod 34": { trueCount: 12, falseCount: 10, title: "גדוד 34" },
             }
        },
        trains: {
            title: "רכבות",
            items: {
                "gdod 29": { trueCount: 25, falseCount: 8, title: "גדוד 29" },
                "gdod 34": { trueCount: 15, falseCount: 12, title: "גדוד 34" },
                "gdod 39": { trueCount: 35, falseCount: 3, title: "גדוד 39" },
                // Adding more gdods to the "trains" category
                "gdod 42": { trueCount: 20, falseCount: 10, title: "גדוד 42" },
                "gdod 47": { trueCount: 28, falseCount: 5, title: "גדוד 47" },
                "gdod 52": { trueCount: 18, falseCount: 7, title: "גדוד 52" },
                "gdod 30": { trueCount: 30, falseCount: 2, title: "גדוד 30" },
                "gdod 31": { trueCount: 18, falseCount: 15, title: "גדוד 31" },
                "gdod 33": { trueCount: 22, falseCount: 8, title: "גדוד 33" },
            }
        },
        trucks: {
            title: "משאיות",
            items: {
                "gdod 40": { trueCount: 18, falseCount: 10, title: "גדוד 40" },
                "gdod 45": { trueCount: 30, falseCount: 2, title: "גדוד 45" },
                "gdod 50": { trueCount: 22, falseCount: 5, title: "גדוד 50" },
                // Adding more gdods to the "trucks" category
                "gdod 53": { trueCount: 25, falseCount: 8, title: "גדוד 53" },
                "gdod 58": { trueCount: 20, falseCount: 7, title: "גדוד 58" },
                "gdod 63": { trueCount: 18, falseCount: 12, title: "גדוד 63" },
                "gdod 30": { trueCount: 30, falseCount: 2, title: "גדוד 30" },
                "gdod 31": { trueCount: 18, falseCount: 15, title: "גדוד 31" },
                "gdod 33": { trueCount: 22, falseCount: 8, title: "גדוד 33" },
                "gdod 34": { trueCount: 12, falseCount: 10, title: "גדוד 34" },
            }
        },
        vehicles: {
            title: "רכבים",
            items: {
                "gdod 1": { trueCount: 5, falseCount: 15, title: "גדוד 1" },
                "gdod 3": { trueCount: 8, falseCount: 12, title: "גדוד 3" },
                "gdod 7": { trueCount: 6, falseCount: 14, title: "גדוד 7" },
                "gdod 9": { trueCount: 12, falseCount: 8, title: "גדוד 9" },
                "gdod 10": { trueCount: 15, falseCount: 5, title: "גדוד 10" },
                "gdod 15": { trueCount: 20, falseCount: 2, title: "גדוד 15" },
                "gdod 20": { trueCount: 10, falseCount: 8, title: "גדוד 20" },
                "gdod 29": { trueCount: 25, falseCount: 8, title: "גדוד 29" },
                "gdod 34": { trueCount: 15, falseCount: 12, title: "גדוד 34" },
                "gdod 39": { trueCount: 35, falseCount: 3, title: "גדוד 39" },
            }
        },
        weapons: {
            title: "נשק",
            items: {
                "gdod 11": { trueCount: 25, falseCount: 3, title: "גדוד 11" },
                "gdod 16": { trueCount: 18, falseCount: 6, title: "גדוד 16" },
                "gdod 21": { trueCount: 12, falseCount: 10, title: "גדוד 21" },
                "gdod 28": { trueCount: 15, falseCount: 10, title: "גדוד 28" },
                "gdod 33": { trueCount: 30, falseCount: 5, title: "גדוד 33" },
                "gdod 38": { trueCount: 22, falseCount: 7, title: "גדוד 38" },
                "gdod 41": { trueCount: 18, falseCount: 12, title: "גדוד 41" },
                "gdod 46": { trueCount: 25, falseCount: 5, title: "גדוד 46" },
                "gdod 51": { trueCount: 30, falseCount: 2, title: "גדוד 51" },
            }
        },
        aircraft: {
            title: "מטוסים",
            items: {
                "gdod 12": { trueCount: 30, falseCount: 5, title: "גדוד 12" },
                "gdod 17": { trueCount: 22, falseCount: 8, title: "גדוד 17" },
                "gdod 22": { trueCount: 15, falseCount: 12, title: "גדוד 22" },
                "gdod 14": { trueCount: 12, falseCount: 10, title: "גדוד 14" },
                "gdod 19": { trueCount: 28, falseCount: 2, title: "גדוד 19" },
                "gdod 24": { trueCount: 16, falseCount: 6, title: "גדוד 24" },
            }
        },
        watercraft: {
            title: "ימיים",
            items: {
                "gdod 13": { trueCount: 18, falseCount: 7, title: "גדוד 13" },
                "gdod 18": { trueCount: 25, falseCount: 3, title: "גדוד 18" },
                "gdod 23": { trueCount: 10, falseCount: 10, title: "גדוד 23" },
                "gdod 25": { trueCount: 8, falseCount: 15, title: "גדוד 25" },
                "gdod 30": { trueCount: 18, falseCount: 5, title: "גדוד 30" },
                "gdod 35": { trueCount: 12, falseCount: 10, title: "גדוד 35" },
            }
        },
        space: {
            title: "חלל",
            items: {
                "gdod 26": { trueCount: 5, falseCount: 20, title: "גדוד 26" },
                "gdod 31": { trueCount: 15, falseCount: 8, title: "גדוד 31" },
                "gdod 36": { trueCount: 25, falseCount: 3, title: "גדוד 36" },
            }
        },
    };
    
    return (
        <Box
        sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}
        >
            <DefaultNavbar title="זמינות תת יחידות"/>
            <Card style={{height: "100%"}}>
                <PrecentageTable magadData={magadData} onSelect={console.log}/>
                <Button onClick={() => downloadPrecentageTable(magadData, "זמינות תת יחידות")}>הורד כאקסל</Button>
            </Card>
        </Box>
    )
};

export default ZminotTatYehidotView;