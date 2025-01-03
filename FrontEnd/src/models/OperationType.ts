export type OperationComplianceType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListId: number;
    createAt: string;
    updateAt: string;
};

//--------------------------------------------

type OperationApproachType =
    | 'OPEN'
    | 'LAPAROSCOPIC_MULTIPORT'
    | 'LAPAROSCOPIC_SINGLEPORT'
    | 'ROBOTIC_MULTIPORT'
    | 'ROBOTIC_SINGLEPORT'
    | 'OPEN_CONVERSION';

export type OperationInfoFormType = {
    [key: string]: string | number | string[] | OperationApproachType | string[] | Date | '';

    operationTypeNames: string[] | ''; //수술방법
    operationApproach: OperationApproachType | ''; //수술approach //enum
    stomaFormation: 'YES' | 'NO' | ''; //장루 조성술 여부
    operationStartTime: Date | ''; //수술 시작 시간
    operationEndTime: Date | ''; //수술 종료 시간
    totalOperationTime: number | ''; //전체 수술 시간 (분)
    totalFluidsAmount: number | ''; //수술 중 총 들어간 수액 양 (cc)
    bloodLoss: number | ''; //수술 중 실혈량 (cc)
}; //환자 수술정보 등록폼

export type OperationItemType = {
    operationId: number;
    operationTypeNames: string[]; //수술방법
    operationApproach: OperationApproachType; //수술approach //enum
    stomaFormation: 'YES' | 'NO'; //장루 조성술 여부
    operationStartTime: Date; //수술 시작 시간
    operationEndTime: Date; //수술 종료 시간
    totalOperationTime: number; //전체 수술 시간 (분)
    totalFluidsAmount: number; //수술 중 총 들어간 수액 양 (cc)
    bloodLoss: number; //수술 중 실혈량 (cc)mvn clean install
    complicationStatus: 'YES' | 'NO'; //합병증 여부
    complicationRegistered: boolean;
    complicationScore: number;
    complianceScoreDTO: {
        totalCheckListCompleted: number;
        totalCheckListCount: number;
        compliancePercentage: number;
    };
};
