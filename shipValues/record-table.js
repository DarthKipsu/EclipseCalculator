var recordTable = {
    terran: {
        interceptor: {
            one: null,
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 0,
            shield: 0,
            hull: 0,
            initiative: 3,
            energy: 1,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: null,
            three: 'ionCannon',
            four: 'nuclearSource',
            five: 'electronComputer',
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 1,
            initiative: 2,
            energy: 1,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: null,
            four: 'hull',
            five: 'nuclearSource',
            six: 'ionCannon',
            seven: 'electronComputer',
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 1,
            energy: 0,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: null,
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 4,
            energy: 2,
            speed: 0
        }
    },

    enemyTerran: {
        interceptor: {
            one: null,
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 0,
            shield: 0,
            hull: 0,
            initiative: 3,
            energy: 1,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: null,
            three: 'ionCannon',
            four: 'nuclearSource',
            five: 'electronComputer',
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 1,
            initiative: 2,
            energy: 1,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: null,
            four: 'hull',
            five: 'nuclearSource',
            six: 'ionCannon',
            seven: 'electronComputer',
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 1,
            energy: 0,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: null,
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 4,
            energy: 2,
            speed: 0
        }
    },

    eridani: {
        interceptor: {
            one: null,
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 0,
            shield: 0,
            hull: 0,
            initiative: 3,
            energy: 1,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: null,
            three: 'ionCannon',
            four: 'nuclearSource',
            five: 'electronComputer',
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 1,
            initiative: 2,
            energy: 1,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: null,
            four: 'hull',
            five: 'nuclearSource',
            six: 'ionCannon',
            seven: 'electronComputer',
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 1,
            energy: 1,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: null,
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 4,
            energy: 2,
            speed: 0
        }
    },

    hydran: {
        interceptor: {
            one: null,
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 0,
            shield: 0,
            hull: 0,
            initiative: 3,
            energy: 1,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: null,
            three: 'ionCannon',
            four: 'nuclearSource',
            five: 'electronComputer',
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 1,
            initiative: 2,
            energy: 1,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: null,
            four: 'hull',
            five: 'nuclearSource',
            six: 'ionCannon',
            seven: 'electronComputer',
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 1,
            energy: 0,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: null,
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 4,
            energy: 2,
            speed: 0
        }
    },

    planta: {
        interceptor: {
            one: null,
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 0,
            initiative: 1,
            energy: 3,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: null,
            three: 'ionCannon',
            four: 'nuclearSource',
            five: null,
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 1,
            initiative: 1,
            energy: 3,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: 'hull',
            four: 'nuclearSource',
            five: null,
            six: 'ionCannon',
            seven: null,
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 1,
            energy: 2,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: null,
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 2,
            energy: 4,
            speed: 0
        }
    },

    draco: {
        interceptor: {
            one: null,
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 0,
            shield: 0,
            hull: 0,
            initiative: 3,
            energy: 1,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: null,
            three: 'ionCannon',
            four: 'nuclearSource',
            five: 'electronComputer',
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 1,
            initiative: 2,
            energy: 1,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: null,
            four: 'hull',
            five: 'nuclearSource',
            six: 'ionCannon',
            seven: 'electronComputer',
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 1,
            energy: 0,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: null,
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 4,
            energy: 2,
            speed: 0
        }
    },

    mechanema: {
        interceptor: {
            one: null,
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 0,
            shield: 0,
            hull: 0,
            initiative: 3,
            energy: 1,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: null,
            three: 'ionCannon',
            four: 'nuclearSource',
            five: 'electronComputer',
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 1,
            initiative: 2,
            energy: 1,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: null,
            four: 'hull',
            five: 'nuclearSource',
            six: 'ionCannon',
            seven: 'electronComputer',
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 1,
            energy: 0,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: null,
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: 0,
            hull: 2,
            initiative: 4,
            energy: 2,
            speed: 0
        }
    },

    orion: {
        interceptor: {
            one: 'gaussShield',
            two: 'ionCannon',
            three: 'nuclearSource',
            four: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 0,
            shield: -1,
            hull: 0,
            initiative: 4,
            energy: 2,
            speed: 1
        },
        cruiser: {
            one: 'hull',
            two: 'gaussShield',
            three: 'ionCannon',
            four: 'nuclearSource',
            five: 'electronComputer',
            six: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: -1,
            hull: 1,
            initiative: 3,
            energy: 3,
            speed: 1
        },
        dreadnought: {
            one: 'ionCannon',
            two: 'hull',
            three: 'gaussShield',
            four: 'hull',
            five: 'nuclearSource',
            six: 'ionCannon',
            seven: 'electronComputer',
            eight: 'nuclearDrive',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 2,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: -1,
            hull: 2,
            initiative: 2,
            energy: 3,
            speed: 1
        },
        starbase: {
            one: 'hull',
            two: 'ionCannon',
            three: 'hull',
            four: 'gaussShield',
            five: 'electronComputer',
            weapons: {
                dice1HPmissile: 0,
                dice2HPmissile: 0,
                dice1HP: 1,
                dice2HP: 0,
                dice4HP: 0
            },
            computer: 1,
            shield: -1,
            hull: 2,
            initiative: 5,
            energy: 2,
            speed: 0
        }
    }
}

var upgradeAttributes = {
    ionTurret: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 2,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: -1,
        speed: 0
    },
    ionMissile: {
        dice1HPmissile: 3,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    axionComputer: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 3,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    shardHull: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 3,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    fluxShield: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: -3,
        hull: 0,
        initiative: 0,
        energy: -2,
        speed: 0
    },
    conformalDrive: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 2,
        energy: -2,
        speed: 4
    },
    hypergridSource: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 11,
        speed: 0
    },
    ionCannon: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 1,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: -1,
        speed: 0
    },
    electronComputer: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 1,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    hull: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 1,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    nuclearDrive: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 1,
        energy: -1,
        speed: 1
    },
    nuclearSource: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 3,
        speed: 0
    },
    plasmaCannon: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 1,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: -2,
        speed: 0
    },
    plasmaMissile: {
        dice1HPmissile: 0,
        dice2HPmissile: 2,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    antimatterCannon: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 1,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: -4,
        speed: 0
    },
    positronComputer: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 2,
        shield: 0,
        hull: 0,
        initiative: 1,
        energy: -1,
        speed: 0
    },
    gluonComputer: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 2,
        energy: -2,
        speed: 0
    },
    improvedHull: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 2,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    gaussShield: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: -1,
        hull: 0,
        initiative: 0,
        energy: 0,
        speed: 0
    },
    phaseShield: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: -2,
        hull: 0,
        initiative: 0,
        energy: -1,
        speed: 0
    },
    fusionDrive: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 2,
        energy: -2,
        speed: 2
    },
    tachyonDrive: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 3,
        energy: -3,
        speed: 3
    },
    fusionSource: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 6,
        speed: 0
    },
    tachyonSource: {
        dice1HPmissile: 0,
        dice2HPmissile: 0,
        dice1HP: 0,
        dice2HP: 0,
        dice4HP: 0,
        computer: 0,
        shield: 0,
        hull: 0,
        initiative: 0,
        energy: 9,
        speed: 0
    }
}
