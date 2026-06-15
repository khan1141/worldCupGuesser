package com.worldcup.backend;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    private final NtRespository repository;

    public DataInitializer(NtRespository repository) {
        this.repository = repository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (repository.count() > 0) return;

        // Official FIFA 2026 World Cup groups — draw held December 5, 2025
        Object[][] teams = {
            // Group A
            { "Mexico",                  "/flags/MEX.png", "A", "CONCACAF", 16  },
            { "South Africa",            "/flags/RSA.png", "A", "CAF",      66  },
            { "Korea Republic",          "/flags/KOR.png", "A", "AFC",      23  },
            { "Czech Republic",          "/flags/CZE.png", "A", "UEFA",     40  },
            // Group B
            { "Canada",                  "/flags/CAN.png", "B", "CONCACAF", 40  },
            { "Bosnia & Herzegovina",    "/flags/BIH.png", "B", "UEFA",     55  },
            { "Qatar",                   "/flags/QAT.png", "B", "AFC",      34  },
            { "Switzerland",             "/flags/SUI.png", "B", "UEFA",     19  },
            // Group C
            { "Brazil",                  "/flags/BRA.png", "C", "CONMEBOL", 5   },
            { "Morocco",                 "/flags/MAR.png", "C", "CAF",      14  },
            { "Haiti",                   "/flags/HAI.png", "C", "CONCACAF", 87  },
            { "Scotland",                "/flags/SCO.png", "C", "UEFA",     38  },
            // Group D
            { "USA",                     "/flags/USA.png", "D", "CONCACAF", 11  },
            { "Paraguay",                "/flags/PAR.png", "D", "CONMEBOL", 60  },
            { "Australia",               "/flags/AUS.png", "D", "AFC",      22  },
            { "Turkey",                  "/flags/TUR.png", "D", "UEFA",     29  },
            // Group E
            { "Germany",                 "/flags/GER.png", "E", "UEFA",     12  },
            { "Curacao",                 "/flags/CUW.png", "E", "CONCACAF", 82  },
            { "Ivory Coast",             "/flags/CIV.png", "E", "CAF",      60  },
            { "Ecuador",                 "/flags/ECU.png", "E", "CONMEBOL", 44  },
            // Group F
            { "Netherlands",             "/flags/NED.png", "F", "UEFA",     7   },
            { "Japan",                   "/flags/JPN.png", "F", "AFC",      18  },
            { "Sweden",                  "/flags/SWE.png", "F", "UEFA",     24  },
            { "Tunisia",                 "/flags/TUN.png", "F", "CAF",      32  },
            // Group G
            { "Belgium",                 "/flags/BEL.png", "G", "UEFA",     3   },
            { "Egypt",                   "/flags/EGY.png", "G", "CAF",      36  },
            { "Iran",                    "/flags/IRN.png", "G", "AFC",      21  },
            { "New Zealand",             "/flags/NZL.png", "G", "OFC",      98  },
            // Group H
            { "Spain",                   "/flags/ESP.png", "H", "UEFA",     2   },
            { "Cape Verde",              "/flags/CPV.png", "H", "CAF",      78  },
            { "Saudi Arabia",            "/flags/KSA.png", "H", "AFC",      58  },
            { "Uruguay",                 "/flags/URU.png", "H", "CONMEBOL", 15  },
            // Group I
            { "France",                  "/flags/FRA.png", "I", "UEFA",     2   },
            { "Senegal",                 "/flags/SEN.png", "I", "CAF",      20  },
            { "Iraq",                    "/flags/IRQ.png", "I", "AFC",      63  },
            { "Norway",                  "/flags/NOR.png", "I", "UEFA",     26  },
            // Group J
            { "Argentina",               "/flags/ARG.png", "J", "CONMEBOL", 1   },
            { "Algeria",                 "/flags/ALG.png", "J", "CAF",      35  },
            { "Austria",                 "/flags/AUT.png", "J", "UEFA",     25  },
            { "Jordan",                  "/flags/JOR.png", "J", "AFC",      70  },
            // Group K
            { "Portugal",                "/flags/POR.png", "K", "UEFA",     6   },
            { "DR Congo",                "/flags/COD.png", "K", "CAF",      56  },
            { "Uzbekistan",              "/flags/UZB.png", "K", "AFC",      70  },
            { "Colombia",                "/flags/COL.png", "K", "CONMEBOL", 9   },
            // Group L
            { "England",                 "/flags/ENG.png", "L", "UEFA",     5   },
            { "Croatia",                 "/flags/CRO.png", "L", "UEFA",     10  },
            { "Ghana",                   "/flags/GHA.png", "L", "CAF",      60  },
            { "Panama",                  "/flags/PAN.png", "L", "CONCACAF", 77  },
        };

        for (Object[] t : teams) {
            repository.save(new NationalTeam(
                (String)  t[0],
                (String)  t[1],
                (String)  t[2],
                (String)  t[3],
                (Integer) t[4]
            ));
        }
    }
}
