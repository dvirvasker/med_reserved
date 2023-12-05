import { Box } from "@mui/material";
import Card from "../Components/Card";
import MenuTree from "../Components/MenuTree";
import { iMenuTreeItem } from "../interfaces";
import { UnitTreeNavbar } from "../Components/Navbar";
import { useSignal } from "@preact/signals";

const UnitTreeView = () => {
  const searchValue = useSignal("");
  
  const data: iMenuTreeItem = {
        title: "תפריט ראשי",
        to: "/main-menu",
        items: [
          {
            title: "טכנולוגיות",
            to: "/technology",
            items: [
              {
                title: "ג'אווה סקריפט",
                to: "/technology/javascript",
                items: [
                  {
                    title: "ES6",
                    to: "/technology/javascript/es6"
                  },
                  {
                    title: "TypeScript",
                    to: "/technology/javascript/typescript"
                  }
                ]
              },
              {
                title: "ריאקט",
                to: "/technology/react",
                items: [
                  {
                    title: "Hooks",
                    to: "/technology/react/hooks"
                  },
                  {
                    title: "Context API",
                    to: "/technology/react/context-api"
                  }
                ]
              },
              {
                title: "נוד.ג'י.אס",
                to: "/technology/nodejs",
                items: [
                  {
                    title: "Express.js",
                    to: "/technology/nodejs/express"
                  },
                  {
                    title: "MongoDB",
                    to: "/technology/nodejs/mongodb"
                  }
                ]
              }
            ]
          },
          {
            title: "נגמשים",
            to: "/used",
            items: [
              {
                title: "איתן",
                to: "/used/itan",
                items: [
                  {
                    title: "מקט 313",
                    to: "/used/itan/313"
                  },
                  {
                    title: "מקט 314",
                    to: "/used/itan/314"
                  },
                  {
                    title: "מקט 315",
                    to: "/used/itan/315"
                  }
                ]
              },
              {
                title: "נמר",
                to: "/used/namer",
                items: [
                  {
                    title: "מקט 212",
                    to: "/used/namer/212"
                  },
                  {
                    title: "מקט 3301",
                    to: "/used/namer/3301"
                  },
                  {
                    title: "מקט נמר עג זיו",
                    to: "/used/namer/ziv"
                  },
                  {
                    title: "מקט נמר עג טוב",
                    to: "/used/namer/tov"
                  }
                ]
              }
            ]
          },
        ]
      };

    return (
      <Box 
      sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}>
      <UnitTreeNavbar title="עץ יחידות" setSearch={(value) => searchValue.value = value} />
      <Card style={{height: "100%"}}>
        <MenuTree data={data} debouncedData={searchValue.value}/>
      </Card>
    </Box>

    )
}
export default UnitTreeView;

