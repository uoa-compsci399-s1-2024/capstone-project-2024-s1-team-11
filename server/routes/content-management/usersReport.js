const express = require("express");
const authenticate = require("../auth/authenticate")
const { authorize } = require("../auth/authorization")
const Repository = require("../../repository/repository");


const router = express.Router()

router.use(express.json());
router.use(authenticate);
router.use(authorize);
router.post('/', async(req, res) => {
    const repo = await Repository.getRepoInstance();
    const users = await repo.getAllUsers();
    const regions_map = new Map;
    // Inefficient, will optimize later.
    for (const [user_id, user] of users.entries()){
        let region_name = user.district;
        if (!regions_map.get(region_name)) {
            const region = {region_name: region_name, user_count: 1, rocks_count: await repo.getUserRocksCount(user_id)};
            regions_map.set(region_name, region);
        } else {
            regions_map.get(region_name).user_count += 1;
            regions_map.get(region_name).rocks_count += await repo.getUserRocksCount(user_id);
        }
    }
    const regions_array = Array.from(regions_map, ([region_name, region]) => ({region}))
    return res.json(regions_array);
})

module.exports = router;