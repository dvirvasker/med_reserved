import { iDynamicListField, iField, iSelectField } from "../interfaces"; 
const fields: iField[] = [
    {
        id: "carnumber",
        inputType: "text",
        title: "מספר מכונית",
        fieldType: "TEXT_FIELD",
        width: 2,
        registerOptions: {
            required: "חובה להכניס מספר מכונית",
            maxLength: {value: 8, message: "מספר מכונית חייב להיות בדיוק 8 תווים"},
            minLength: {value: 8, message: "מספר מכונית חייב להיות בדיוק 8 תווים"},
       },
       button: {
        title: "חיפוש",
        width: 1,
        onAction: (fieldValue: any) => {console.log(fieldValue)}
       }
    },
    {
        id: "family",
        inputType: "text",
        title: "משפחה",
        fieldType: "TEXT_FIELD",
        width: 3
    },
    {
        id: "status",
        title: "סטאטוס הכלי",
        fieldType: "SELECT",
        options: [
            {id: "working", value:"עובד"},
            {id: "broken", value:"מקולקל"},
            {id: "half", value: "חצי כוח עובד"}
        ],
        defaultValue: {id: "working", value:"עובד"},
        width: 3
    },
    {
        id: "groups",
        title: "קבוצות",
        fieldType: "MULTI_SELECT",
        options: [
            {id: "group1", value:"קבוצה א"},
            {id: "group2", value:"קבוצה ב"},
            {id: "group3", value: "קבוצה ג"}
            
        ],
        width: 3
    },
    {
        id: "magadal",
        title: "מאגד על",
        fieldType: "SELECT",
        options: [
            {
                id: "tank",
                value: "טנק"
            },
            {
                id: "nagmash",
                value: "נגמש"
            },
            {
                id: "rocket",
                value: "טיל"
            }
        ],
        width: 3,
    },
    {
        id: "magad",
        title: "מאגד",
        fieldType: "SELECT",
        options: [
            {
                id: "nahash",
                value: "נחש"
            },
            {
                id: "aria",
                value: "אריה"
            },
            {
                id: "tiger",
                value: "נמר"
            }
        ],
        width: 3,
        dependsOn: "magadal"
    },
    {
        id: "mkabaz",
        title: "מקבץ",
        fieldType: "SELECT",
        options: [
            {
                id: "watermelon",
                value: "אבטיח"
            },
            {
                id: "mango",
                value: "מנגו"
            },
            {
                id: "strawberry",
                value: "תות"
            }
        ],
        width: 3,
        dependsOn: "magad"
    },
    {
        id: "makat",
        title: "מקט",
        fieldType: "SELECT",
        options: [
            {
                id: "sandals",
                value: "סנדלים"
            },
            {
                id: "sports_shoes",
                value: "נעלי ספורט"
            },
            {
                id: "boots",
                value: "מגפיים"
            }
        ],
        width: 3,
        dependsOn: "mkabaz"
    },
    {
        id: "pikod",
        title: "פיקוד",
        fieldType: "SELECT",
        options: [
            { id: "pikod1", value: "פיקוד 1" },
            { id: "pikod2", value: "פיקוד 2" },
            { id: "pikod3", value: "פיקוד 3" }
        ],
        width: 3
    },
    {
        id: "ogda",
        title: "אוגדה",
        fieldType: "SELECT",
        options: [
            { id: "ogda1", value: "אוגדה 1" },
            { id: "ogda2", value: "אוגדה 2" },
            { id: "ogda3", value: "אוגדה 3" }
        ],
        width: 3,
        dependsOn: "pikod"
    },
    {
        id: "hativa",
        title: "חטיבה",
        fieldType: "SELECT",
        options: [
            { id: "hativa1", value: "חטיבה 1" },
            { id: "hativa2", value: "חטיבה 2" },
            { id: "hativa3", value: "חטיבה 3" }
        ],
        width: 3,
        dependsOn: "ogda"
    },
    {
        id: "gdod",
        title: "גדוד",
        fieldType: "SELECT",
        options: [
            { id: "gdod1", value: "גדוד 1" },
            { id: "gdod2", value: "גדוד 2" },
            { id: "gdod3", value: "גדוד 3" }
        ],
        width: 3,
        dependsOn: "hativa"
    },
    {
        id: "peluga",
        title: "פלוגה",
        fieldType: "TEXT_FIELD",
        width: 3
    },
    {
        id: "shevetzak",
        title: "שבצק",
        fieldType: "TEXT_FIELD",
        width: 3
    },
    {
        id: "mikomBimach",
        title: "מיקום בימח",
        fieldType: "TEXT_FIELD",
        width: 3
    },
    {
        id: "maamadGdod",
        title: "מעמד כלי",
        fieldType: "SELECT",
        options: [
            { id: "sadir", value: "סדיר" },
            { id: "miluim", value: "מילואים" },
            { id: "hachai", value: "החי" }
        ],
        width: 3
    },
    {
        id: "tech_title",
        title: "טכנולוגיות",
        fieldType: "TITLE"
    },
    {
        id: "systems",
        title: "הוספת טכנולוגיות",
        visibleWhen: [
            {key: "magadal", value: "tank"}
        ],
        fieldType: "DYNAMIC_LIST",
        fields: [
            {
                id: "systemName",
                title: "שם מערכת",
                fieldType: "SELECT",
                options: [
                    { id: "system1", value: "מערכת 1" },
                    { id: "system2", value: "מערכת 2" },
                    { id: "system3", value: "מערכת 3" },
                    { id: "system4", value: "מערכת 4" },
                    { id: "system5", value: "מערכת 5" }
                ],
                width: 6
            } as iSelectField,
            {
                id: "isSystemKashir",
                title: "כשירות",
                fieldType: "SELECT",
                options: [
                    {id: "kashir_system", value: "כשיר"},
                    {id: "not_kashir", value: "לא כשיר"}
                ],
                defaultValue: {id: "kashir_system", value: "כשיר"},
                width: 6,
                dependsOn: "systemName"
            } as iSelectField,
            {
                id: "tipuls",
                title: "הוסף טיפול",
                visibleWhen: [{key: "isSystemKashir", value: "not_kashir"}],
                fieldType: "DYNAMIC_LIST",
                fields: [
                    {
                        id: "type",
                        title: "סוג טיפול",
                        fieldType: "SELECT",
                        options: [
                            { id: "easy", value: "קל"},
                            { id: "medium", value: "בינוני"},
                            { id: "hard", value: "קשה"},
                        ],
                        width: 6
                    },
                    {
                        id: "whenStarted",
                        title: "תחילת טיפול",
                        fieldType: "DATE",
                        width: 6
                    },
                    {
                        id: "hh_stand",
                        title: "הוסף חח",
                        fieldType: "DYNAMIC_LIST",
                        fields: [
                            {
                                id: "missing_hh",
                                title: "מקט חסר",
                                fieldType: "TEXT_FIELD",
                                inputType: "number",
                                width: 6
                            },
                            {
                                id: "count",
                                title: "כמות",
                                fieldType: "TEXT_FIELD",
                                inputType: "number",
                                width: 6
                            }
                        ] 
                    } as iDynamicListField,
                ]
            } as iDynamicListField,
            {
                id: "harig_tipuls",
                title: "הוסף חריג טיפול",
                visibleWhen: [{key: "isSystemKashir", value: "not_kashir"}],
                fieldType: "DYNAMIC_LIST",
                fields: [
                    {
                        id: "type",
                        title: "סוג חריג טיפול",
                        fieldType: "SELECT",
                        options: [
                            { id: "easy", value: "קל"},
                            { id: "medium", value: "בינוני"},
                            { id: "hard", value: "קשה"},
                        ],
                        width: 6
                    },
                    {
                        id: "whenStarted",
                        title: "תחילת חריג טיפול",
                        fieldType: "DATE",
                        width: 6
                    },
                    {
                        id: "hh_stand",
                        title: "הוסף חח",
                        fieldType: "DYNAMIC_LIST",
                        fields: [
                            {
                                id: "missing_hh",
                                title: "מקט חסר",
                                fieldType: "TEXT_FIELD",
                                inputType: "number",
                                width: 6
                            },
                            {
                                id: "count",
                                title: "כמות",
                                fieldType: "TEXT_FIELD",
                                inputType: "number",
                                width: 6
                            }
                        ] 
                    } as iDynamicListField,
                ]
            } as iDynamicListField,
            {
                id: "midamenet_tipul",
                title: "הוסף תקלה מזדמנת",
                visibleWhen: [{key: "isSystemKashir", value: "not_kashir"}],
                fieldType: "DYNAMIC_LIST",
                fields: [
                    {
                        id: "type",
                        title: "סוג תקלה",
                        fieldType: "SELECT",
                        options: [
                            { id: "easy", value: "קלה"},
                            { id: "medium", value: "בינונית"},
                            { id: "hard", value: "קשה"},
                        ],
                        width: 6
                    },
                    {
                        id: "whenStarted",
                        title: "תחילת תקלה מזדמנת",
                        fieldType: "DATE",
                        width: 6
                    },
                    {
                        id: "hh_stand",
                        title: "הוסף חח",
                        fieldType: "DYNAMIC_LIST",
                        fields: [
                            {
                                id: "missing_hh",
                                title: "מקט חסר",
                                fieldType: "TEXT_FIELD",
                                inputType: "number",
                                width: 6
                            },
                            {
                                id: "count",
                                title: "כמות",
                                fieldType: "TEXT_FIELD",
                                inputType: "number",
                                width: 6
                            }
                        ] 
                    } as iDynamicListField,

                ]
            } as iDynamicListField
        ]
    } as iDynamicListField,
    {
        id: "zminot_title",
        title: "זמינות וכשירות",
        fieldType: "TITLE"
    },
    {
        id: "zminut",
        title: "זמינות",
        fieldType: "SELECT",
        options: [
            { id: "zmin", value: "זמין" },
            { id: "loZmin", value: "לא זמין" }
        ],
        width: 6
    },
    {
        id: "kshirot",
        title: "כשירות",
        fieldType: "SELECT",
        options: [
            { id: "kshir", value: "כשיר" },
            { id: "loKshir", value: "לא כשיר" }
        ],
        width: 6
    },
    {
        id: "tipuls",
        title: "הוסף טיפול",
        fieldType: "DYNAMIC_LIST",
        visibleWhen: [
            { key: "zminut", value: "loZmin" },
            { key: "kshirot", value: "loKshir" },
        ],
        fields: [
            {
                id: "type",
                title: "סוג טיפול",
                fieldType: "SELECT",
                options: [
                    { id: "easy", value: "קל"},
                    { id: "medium", value: "בינוני"},
                    { id: "hard", value: "קשה"},
                ],
                width: 6
            },
            {
                id: "whenStarted",
                title: "תחילת טיפול",
                fieldType: "DATE",
                width: 6
            },
            {
                id: "hh_stand",
                title: "הוסף חח",
                fieldType: "DYNAMIC_LIST",
                fields: [
                    {
                        id: "missing_hh",
                        title: "מקט חסר",
                        fieldType: "TEXT_FIELD",
                        inputType: "number",
                        width: 6
                    },
                    {
                        id: "count",
                        title: "כמות",
                        fieldType: "TEXT_FIELD",
                        inputType: "number",
                        width: 6
                    }
                ] 
            } as iDynamicListField,
        ]
    } as iDynamicListField,
    {
        id: "harig_tipuls",
        title: "הוסף חריג טיפול",
        fieldType: "DYNAMIC_LIST",
        visibleWhen: [
            { key: "zminut", value: "loZmin" },
            { key: "kshirot", value: "loKshir" },
        ],
        fields: [
            {
                id: "type",
                title: "סוג חריג טיפול",
                fieldType: "SELECT",
                options: [
                    { id: "easy", value: "קל"},
                    { id: "medium", value: "בינוני"},
                    { id: "hard", value: "קשה"},
                ],
                width: 6
            },
            {
                id: "whenStarted",
                title: "תחילת חריג טיפול",
                fieldType: "DATE",
                width: 6
            },
            {
                id: "hh_stand",
                title: "הוסף חח",
                fieldType: "DYNAMIC_LIST",
                fields: [
                    {
                        id: "missing_hh",
                        title: "מקט חסר",
                        fieldType: "TEXT_FIELD",
                        inputType: "number",
                        width: 6
                    },
                    {
                        id: "count",
                        title: "כמות",
                        fieldType: "TEXT_FIELD",
                        inputType: "number",
                        width: 6
                    }
                ] 
            } as iDynamicListField,
        ]
    } as iDynamicListField,
    {
        id: "takala_mizdamenet",
        title: "הוסף תקלה מזדמנת",
        fieldType: "DYNAMIC_LIST",
        visibleWhen: [
            { key: "zminut", value: "loZmin" },
            { key: "kshirot", value: "loKshir" },
        ],
        fields: [
            {
                id: "type",
                title: "סוג תקלה",
                fieldType: "SELECT",
                options: [
                    { id: "easy", value: "קלה"},
                    { id: "medium", value: "בינונית"},
                    { id: "hard", value: "קשה"},
                ],
                width: 6
            },
            {
                id: "whenStarted",
                title: "תחילת תקלה מזדמנת",
                fieldType: "DATE",
                width: 6
            },
            {
                id: "hh_stand",
                title: "הוסף חח",
                fieldType: "DYNAMIC_LIST",
                fields: [
                    {
                        id: "missing_hh",
                        title: "מקט חסר",
                        fieldType: "TEXT_FIELD",
                        inputType: "number",
                        width: 6
                    },
                    {
                        id: "count",
                        title: "כמות",
                        fieldType: "TEXT_FIELD",
                        inmidamenet_tipulputType: "number",
                        width: 6
                    }
                ] 
            } as iDynamicListField,

        ]
    } as iDynamicListField,
    {
        id: "description",
        title: "מהות התקלה",
        fieldType: "TEXT_FIELD",
        visibleWhen: [
            { key: "systems.isSystemKashir", value: "not_kashir" },
            { key: "zminut", value: "loZmin" },
            { key: "kshirot", value: "loKshir" },
        ],
        width: 6
    },
    {
        id: "end_expecetnacy",
        title: "צפי סיום",
        fieldType: "SELECT",
        options: [
            { id: "6 hours", value: "עד 6 שעות"}
        ],
        visibleWhen: [
            { key: "systems.isSystemKashir", value: "not_kashir" },
            { key: "zminut", value: "loZmin" },
            { key: "kshirot", value: "loKshir"},
            { key: "isSystemKashir", value: "not_kashir"},

        ],
        width: 6,
    },
    {
        id: "mikom",
        title: "מיקום",
        fieldType: "TEXT_FIELD",
        width: 6,
    },
    {
        id: "lastKiulDate",
        title: "מועד כיול אחרון",
        fieldType: "DATE",
        width: 6,
    },


];

