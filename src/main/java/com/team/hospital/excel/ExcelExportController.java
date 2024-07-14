package com.team.hospital.excel;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class ExcelExportController {

    private final ExcelExportService excelExportService;

    @GetMapping("export-excel")
    public ResponseEntity<InputStreamResource> exportToExcel() throws IOException {
        ByteArrayInputStream in = excelExportService.exportToExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=hospital_data.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(in));
    }

}
