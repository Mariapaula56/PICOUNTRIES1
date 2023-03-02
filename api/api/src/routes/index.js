const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");
const router = Router();

const getApiInfo = async () => {
  const getApi = await axios.get("http://restcountries.com/v3/all");

  const apiInfoDb = await getApi.data.map((el) => {
    return {
      id: el.cca3,
      name: el.name.common,
      flags: el.flags ? el.flags[1] : "No tiene Imagen",
      continents: el.continents[0],
      capital: el.capital ? el.capital[0] : "No tiene capital",
      subregion: el.subregion ? el.subregion : "No tiene SubRegion",
      area: el.area,
      population: el.population,
    };
  });
  apiInfoDb.forEach((el) => {
    Country.findOrCreate({
      where: {
        id: el.id,
        name: el.name,
        flag: el.flags,
        continents: el.continents,
        capital: el.capital,
        subregion: el.subregion,
        area: el.area,
        population: el.population,
      },
    });
  });
};
getApiInfo();

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const countries = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      });
      countries.length > 0 ? res.send(countries) : res.send("no dtabase");
    } else {
      const countryName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      countryName ? res.send(countryName) : res.send("ese pais no existe");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/countries/:id", async (req, res, next) => {
  try {
    const id = req.params.id.toUpperCase();
    // console.log(idpais)
    const country = await Country.findOne({
      where: {
        id: id,
      },
      include: Activity,
    });

    return res.json(country);
  } catch (error) {
    res.send(error);
  }
});
/* router.get("/countries/:idPais", async (req, res) => {
  try {
    let { idPais } = req.params;
    const getDetail = await Country.findAll({
      include: Activity,
      where: { idPais },
    });

    getDetail
      ? res.send(getDetail)
      : response.status(404).send("el pais con este id no se encientra");
    console.log("hiiii", getDetail);
  } catch (error) {
    res.status(404).send(error.message);
  }
}); */

router.post("/activities", async (req, res) => {
  try {
    const { country, nameActivity, difficulty, duration, season } = req.body;
    const countriesFound = await Country.findOne({
      include: Activity,
      where: {
        name: {
          [Op.iLike]: `%${country}%`,
        },
      },
    });
    let naActivities = [];
    countriesFound?.activities?.map((activty) => {
      if (Activity.name) {
        naActivities.push(activty.name.toLowerCase());
      }
    });
    if (naActivities.include(nameActivity.toLowerCase())) {
      res.status(400).send("esta actividad ya ha sido creada");
    } else {
      if (!country || !nameActivity || !difficulty || !duration || !season) {
        res.send("debes agregar todos los datos");
      } else {
        let newActivity = await Activity.create({
          name: nameActivity,
          difficulty: difficulty,
          duration: duration,
          season: season,
        });
        countriesFound.addActivity(newActivity);
        res.status(200).send("activity countrey created");
      }
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = router;
