board:{

    theme,
    _id,
    userId,
    users,
    lists:[
        list:{
            _id,
            title,
            theme/color,
            tasks:[
                task:{
                    _id,
                    title,
                    description,
                    creatorId,
                    membersId:[],
                    comments:[],
                    dueDate,
                    labels:[
                        label:{
                            title,
                            color,
                            importance
                        }
                    ],
                    isDone:true/false,
                    attachment,

                }
            ]
        }
    ]

}

Components : 
taskList
taskPreview
taskDetails
sideBar
Pages :
boardDetails
