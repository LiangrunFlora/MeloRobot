import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import QuickAns from "@/resources/Search/quickAns.png";
import Summary from "@/resources/Search/summary.png";
import useSummaryMessages from "@/static/useSummaryMsg.tsx";
import ReactMarkdown from "react-markdown";
import puad from "@/resources/puad.png";
import useSearchLoading from "@/static/useSearchLoading";

const SummaryCard = () => {
  const { summaryMsg } = useSummaryMessages();
  const { loading } = useSearchLoading();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
          paddingLeft: 4,
          paddingTop: 2,
          width: "70%",
        }}
      >
        <Grid container>
          <Grid xs={1}>
            <img src={puad} style={{ width: "70%" }} />
          </Grid>
          <Grid xs={3}>
            <Typography
              sx={{ fontFamily: "Arial", color: "black", fontSize: "25px" }}
            >
              MeloRobot搜索
            </Typography>
          </Grid>
        </Grid>
        <Card sx={{ width: "80%", marginBottom: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={Summary}
                alt="QuickAns"
                style={{ maxWidth: "30px", maxHeight: "30px" }}
              />
              <Typography variant="h5" component="div">
                专业搜索
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "80%", marginBottom: 2, paddingTop: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={QuickAns}
                alt="QuickAns"
                style={{ maxWidth: "30px", maxHeight: "30px" }}
              />
              <Typography variant="h5" component="div">
                快速回答
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {loading && (
                <>
                  <span className="loading loading-ball loading-xs"></span>
                  <span className="loading loading-ball loading-sm"></span>
                  <span className="loading loading-ball loading-md"></span>
                  <span className="loading loading-ball loading-lg"></span>
                </>
              )}
              <ReactMarkdown>{summaryMsg.result}</ReactMarkdown>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SummaryCard;
