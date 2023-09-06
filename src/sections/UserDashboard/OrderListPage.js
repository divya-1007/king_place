import { Helmet } from "react-helmet-async";
import ProductionQuantityLimitsRoundedIcon from "@mui/icons-material/ProductionQuantityLimitsRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from "@mui/material";
// components
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// components
import { Postrequest, GetRequest } from "../../apicall/index";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceForm from "./InvoiceForm";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Cookies from 'js-cookie';
// ------------------------------------------------------------------

const steps = ["Production","Shipping","Payment" ,"Finish"];
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));


function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ProductionQuantityLimitsRoundedIcon />,
    2: <LocalShippingRoundedIcon />,
    3: <PaymentRoundedIcon />,
    4: <DoneOutlineRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

export default function OrderListPage() {
  const { id } = useParams();
  const [usersData, setUsersData] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const getUsers = async (id) => {
    const existingCartDataString = Cookies.get("addToCart");
    const existingCartDatas = existingCartDataString ? JSON.parse(existingCartDataString) : [];
    const UpdateElement = existingCartDatas.find((element) => element?.cartItem?._id === id)
    setUsersData(UpdateElement);
  };  

  useEffect(() => {
    getUsers(id);
  }, [id]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Helmet>
        <title> Product Invoice |King Palace Hotal </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
            Product Invoice
          </Typography>
        </Stack>

        <Card>
          <Box sx={{ width: "100%", p: 2 ,backgroundColor:'#e2e8eb'}}>
            <Stepper sx={{mb:5}} activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  // labelProps.optional = (
                  //   <Typography variant="caption">Optional</Typography>
                  // );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }

                return (
                  <Step key={label} {...stepProps}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
                </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>
                <InvoiceForm step={activeStep} setActiveStep={setActiveStep} usersData={usersData} />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )} */}

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Card>
      </Container>
    </>
  );
}
