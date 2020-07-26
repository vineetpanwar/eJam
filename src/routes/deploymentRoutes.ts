const deploymentModel = require("../models/deployment");
const express = require("express");
const router = express.Router();

//View all deployments
router.get("/deployments", async (req: any, res: any) => {
  try {
    const deployments = await deploymentModel.find({});
    console.log("vineet deployments", deployments);
    res.status(200).send(deployments);
  } catch (err) {
    res.status(500).send(err);
  }
});

//View specific deployment by id
router.get("/deployment/:id", async (req: any, res: any) => {
  const deployment = await deploymentModel.findOne(req.params.id);

  try {
    res.status(200).send(deployment);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Add a deployment
router.post("/deployment", async (req: any, res: any) => {
  const deployment = new deploymentModel(req.body);

  try {
    await deployment.save();
    res.status(200).send(deployment);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete a deployment by id
router.delete("/deployment/:id", async (req: any, res: any) => {
  try {
    console.log("vineet delete", req.params);
    const deployment = await deploymentModel.findByIdAndDelete(req.params.id);

    if (!deployment) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update a deployment
// router.patch("/deployment/:id", async (req: any, res: any) => {
//   try {
//     await deploymentModel.findByIdAndUpdate(req.params.id, req.body);
//     await deploymentModel.save();
//     res.status(200).send();
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
